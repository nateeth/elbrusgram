const { Message, User, Group, UserGroup } = require('../../db/models');
const {
  encryptMessage,
  decryptMessage,
  generateSecretKey,
} = require('../utils/crypto-utils');

const activeConnections = {};

const sendMessages = async (ws, user) => {
  try {
    // Получаем все сообщения из базы данных, упорядоченные по дате
    const messages = await Message.findAll({
      order: [['createdAt', 'ASC']],
    });

    // Генерируем секретный ключ для пользователя (или получаем из базы данных, если нужно)
    const secretKey = await generateSecretKey(user.id); // Получаем симметричный ключ для пользователя

    // Расшифровываем текст сообщений
    const decryptedMessages = await Promise.all(
      messages.map(async (message) => {
        const decryptedText = await decryptMessage(message.text, secretKey); // Расшифровываем сообщение
        return {
          ...message.toJSON(),
          text: decryptedText,
        };
      }),
    );

    // Подготовка объекта действия для отправки
    const action = {
      type: 'chat/setMessages',
      payload: decryptedMessages,
    };

    // Проверяем состояние WebSocket перед отправкой
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(action)); // Отправляем объект как JSON
    } else {
      console.error('WebSocket is not open. Current readyState:', ws.readyState);
    }
  } catch (error) {
    console.error('Error fetching and sending messages:', error);
  }
};

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

  // Слушаем закрытие соединения и удаляем активного пользователя
  ws.on('close', () => {
    delete activeConnections[user.id];
    sendActiveUsers();
  });

  sendActiveUsers();

  sendMessages(ws, user);

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

      if (action.payload?.text) {
        // Получаем симметричный ключ для пользователя и расшифровываем текст
        const secretKey = await generateSecretKey(user.id);
        action.payload.text = await decryptMessage(action.payload.text, secretKey);
      }

      const { type, payload } = action;

      switch (type) {
        case 'NEW_MESSAGE': {
          const currentUser = await User.findByPk(user.id);
          if (!currentUser) {
            console.error('User not found');
            return;
          }

          // Генерация симметричного ключа AES для нового сообщения
          const secretKey = await generateSecretKey(user.id); // Симметричный ключ AES для шифрования

          // Шифруем сообщение
          const { encryptedMessage, encryptedAesKey, iv } = await encryptMessage(
            payload.text,
            secretKey,
          );

          const newMessage = await Message.create({
            text: encryptedMessage, // Сохраняем зашифрованное сообщение
            authorid: user.id,
            authorName: currentUser.name,
            groupid: payload.groupid,
            encryptedAesKey, // Сохраняем зашифрованный AES ключ
            iv, // Вектор инициализации
          });

          // Отправляем зашифрованное сообщение всем пользователям
          Object.values(activeConnections).forEach((userConnection) => {
            const newAction = {
              type: 'chat/addMessage',
              payload: {
                ...newMessage.toJSON(),
                text: encryptedMessage, // зашифрованное сообщение
                encryptedAesKey, // зашифрованный ключ AES
                iv, // вектор инициализации
              },
            };
            userConnection.ws.send(JSON.stringify(newAction));
          });
          break;
        }

        case 'EDIT_MESSAGE': {
          const currentUser = await User.findByPk(user.id);
          if (!currentUser) {
            console.error('User not found');
            return;
          }

          const messageToEdit = await Message.findByPk(payload.messageId);

          if (!messageToEdit) {
            console.error('Message not found');
            return;
          }

          if (messageToEdit.authorid !== user.id) {
            console.error('User is not the author of this message');
            return;
          }

          // Генерация симметричного ключа AES для редактируемого сообщения
          const secretKey = await generateSecretKey(user.id); // Симметричный ключ AES для шифрования

          // Шифруем новое сообщение
          const { encryptedMessage, encryptedAesKey, iv } = await encryptMessage(
            payload.text,
            secretKey,
          );

          messageToEdit.text = encryptedMessage;
          messageToEdit.isEdited = true;

          await messageToEdit.save();

          // Отправляем зашифрованное сообщение всем пользователям
          Object.values(activeConnections).forEach((userConnection) => {
            const newEditAction = {
              type: 'chat/editMessage',
              payload: {
                ...messageToEdit.toJSON(),
                text: encryptedMessage,
                encryptedAesKey,
                iv,
              },
            };
            userConnection.ws.send(JSON.stringify(newEditAction));
          });

          sendMessages(ws, user);
          break;
        }

        case 'DELETE_MESSAGE': {
          const messageToDelete = await Message.findByPk(payload.messageId);

          if (!messageToDelete) {
            console.error('Message not found');
            return;
          }

          if (messageToDelete.authorid !== user.id) {
            console.error('User is not the author of this message');
            return;
          }

          await messageToDelete.destroy();

          Object.values(activeConnections).forEach((userConnection) => {
            const deleteAction = {
              type: 'chat/deleteMessage',
              payload: { messageId: payload.messageId },
            };
            userConnection.ws.send(JSON.stringify(deleteAction));
          });

          Message.findAll({
            order: [['createdAt', 'ASC']],
          }).then((messages) => {
            const editedAction = {
              type: 'chat/setMessages',
              payload: messages,
            };
            ws.send(JSON.stringify(editedAction));
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
            const newGroup = await Group.create({
              title: payload.title,
              ownerid: user.id,
              description: payload.description,
              chatflag: payload.chatflag,
            });

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

            const action = {
              type: 'chat/setGroups',
              payload: groups,
            };

            ws.send(JSON.stringify(action));
          } catch (error) {
            console.error('Error fetching groups:', error);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });
}

module.exports = connection;
