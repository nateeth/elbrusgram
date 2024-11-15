const { Message, User, Group, UserGroup, Reaction } = require('../../db/models');
const activeConnections = {};

function connection(ws, request, user) {
  ws.on('error', console.error);

  activeConnections[user.id] = { ws, user };

  function sendActiveUsers() {
    Object.values(activeConnections).forEach((userConnection) => {
      const action = {
        type: 'chat/setUsers',
        payload: Object.values(activeConnections).map((v) => v.user),
      };
      userConnection.ws.send(JSON.stringify(action));
    });
  }

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

  ws.on('message', (data) => {
    const action = JSON.parse(data);
    const { type, payload } = action;
    switch (type) {
      case 'NEW_MESSAGE':
        Message.create({ text: payload, userId: user.id }).then((newMess) => {
          Object.values(activeConnections).forEach((userConnection) => {
            const newAction = {
              type: 'chat/addMessage',
              payload: newMess,
            };
            userConnection.ws.send(JSON.stringify(newAction));
          });
        });
        break;

      default:
        break;
    }
  })
}

module.exports = connection;