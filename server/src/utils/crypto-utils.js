const crypto = require('crypto');

// Генерация симметричного ключа AES для шифрования сообщений
function encryptMessage(message, secretKey) {
  if (typeof message !== 'string') {
    throw new Error('Message must be a string');
  }

  // Генерация случайного вектора инициализации (IV)
  const iv = crypto.randomBytes(16);

  // Создаем шифратор с использованием AES-256-CBC
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  let encryptedMessage = cipher.update(message, 'utf8', 'base64');
  encryptedMessage += cipher.final('base64');

  return {
    encryptedMessage,
    iv: iv.toString('base64'), // Сохраняем IV для расшифровки
  };
}

// Расшифровка сообщения с использованием симметричного ключа AES
function decryptMessage(encryptedData, secretKey) {
  if (!encryptedData || !encryptedData.iv || !encryptedData.encryptedMessage) {
    throw new Error('Missing encrypted data');
  }

  // Декодируем IV из base64
  const iv = Buffer.from(encryptedData.iv, 'base64');

  // Создаем дешифратор с использованием AES-256-CBC
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
  let decryptedMessage = decipher.update(
    encryptedData.encryptedMessage,
    'base64',
    'utf8',
  );
  decryptedMessage += decipher.final('utf8');

  return decryptedMessage;
}

// Генерация симметричного ключа AES
function generateSecretKey() {
  return crypto.randomBytes(32); // 32 байта для AES-256
}

module.exports = {
  generateSecretKey,
  encryptMessage,
  decryptMessage,
};
