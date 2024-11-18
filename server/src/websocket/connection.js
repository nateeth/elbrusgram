const { Message, User, Group } = require('../../db/models');

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

  Group.findAll().then((groups) => {
    const action = {
      type: 'chat/setGroups',
      payload: groups,
    };
    ws.send(JSON.stringify(action));
  });

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
            text: payload,
            authorid: user.id,
            authorName: currentUser.name,
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
              payload: payload,
            };
            userConnection.ws.send(JSON.stringify(newAction));
          });
          break;
        }

        case 'NEW_GROUP': {
          try {
            const newGroup = await Group.create({
              title: payload.title,
              ownerid: user.id,
              description: payload.description,
              chatflag: payload.chatflag,
            });
            const groupAction = {
              type: 'chat/addGroup',
              payload: newGroup,
            };


            Object.values(activeConnections).forEach((userConnection) => {
              userConnection.ws.send(JSON.stringify(groupAction));
            });

            ws.send(JSON.stringify(groupAction));
          } catch (error) {
            console.error('Error creating new group:', error);
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
