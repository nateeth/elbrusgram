function connection(ws, req, user) {
    // Обработчик для WebSocket соединений
    console.log('User connected', user);
    ws.on('message', (message) => {
      console.log('Message received:', message);
      // Логика обработки сообщений
    });
  
    ws.on('close', () => {
      console.log('User disconnected');
    });
  }
  
  module.exports = connection;