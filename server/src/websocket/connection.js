const { Op } = require('sequelize');
const { Message, User, Group, UserGroup } = require('../../db/models');

const activeConnections = {};

function connection(ws, request, user) {
  ws.on('error', console.error);

  activeConnections[user.id] = { ws, user };

  const sendActiveUsers = () => {
    const activeUsers = Object.values(activeConnections).map((v) => v.user);
    Object.values(activeConnections).forEach((userConnection) => {
      const action = {
        type: 'chat/setUsers',
        payload: activeUsers,
      };
      userConnection.ws.send(JSON.stringify(action));
    });
  };

  ws.on('close', () => {
    delete activeConnections[user.id];
    sendActiveUsers();
  });

  sendActiveUsers();

  Message.findAll().then((messages) => {
    const action = {
      type: 'chat/setMessages',
      payload: messages,
    };
    ws.send(JSON.stringify(action));
  });

  // Group.findAll({
  //   where: {
  //     [Op.or]: [
  //       { ownerid: user.id }, 
  //     ],
  //   },
  //   include: [
  //     {
  //       model: User,
  //       as: 'GroupUser',
  //       through: { attributes: [] }, 
  //       where: { id: user.id }, 
  //       required: false, 
  //     },
  //   ],
  // });
  ws.on('message', async (data) => {
    try {
      const action = JSON.parse(data);
      const { type, payload } = action;

      switch (type) {
        case 'NEW_MESSAGE': {
          const currentUser = await User.findByPk(user.id);
          if (!currentUser) {
            console.error('User not found');
            return;
          }

          const newMessage = await Message.create({
            text: payload.text,
            authorid: user.id,
            authorName: currentUser.name,
            groupid: payload.groupid,
          });

          Object.values(activeConnections).forEach((userConnection) => {
            const newAction = {
              type: 'chat/addMessage',
              payload: newMessage,
            };
            userConnection.ws.send(JSON.stringify(newAction));
          });
          break;
        }

        case 'NEW_DRAW': {
          Object.values(activeConnections).forEach((userConnection) => {
            const newAction = {
              type: 'chat/setDraw',
              payload,
            };
            userConnection.ws.send(JSON.stringify(newAction));
          });
          break;
        }

        case 'NEW_GROUP': {
          try {
            console.log('Payload received on server:', payload);
            const newGroup = await Group.create({
              title: payload.title,
              ownerid: user.id,
              description: payload.description,
              chatflag: payload.chatflag,
            });
            console.log('New group created:', newGroup);

            if (!newGroup || !newGroup.id) {
              throw new Error('Failed to create a new group');
            }

            const userIds = [newGroup.ownerid, ...(payload.users || [])];

            await Promise.all(
              userIds.map((userId) =>
                UserGroup.create({
                  userid: userId,
                  groupid: newGroup.id,
                }),
              ),
            );
            const groupAction = {
              type: 'chat/addGroup',
              payload: {
                ...newGroup.toJSON(),
                users: userIds,
              },
            };

            Object.values(activeConnections)
              .filter((userConnection) => userIds.includes(userConnection.user.id))
              .forEach((userConnection) => {
                userConnection.ws.send(JSON.stringify(groupAction));
              });
          } catch (error) {
            console.error('Error creating new group:', error);
          }
          break;
        }
        case 'getGroups': {

          try {
              const groups = await Group.findAll({
                  include: [
                      {
                          model: User,
                          as: 'members',
                          where: { id: user.id },
                      },
                  ],
              });

              const groupsAction = {
                  type: 'groupsData',
                  payload: groups,
              };
              ws.send(JSON.stringify(groupsAction));
          } catch (error) {
              console.error('Error fetching groups:', error);
          }
          break;
      }


        default:
          console.warn('Unknown action type:', type);
          break;
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
}

module.exports = connection;
