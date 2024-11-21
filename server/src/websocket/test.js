const CryptoJS = require('crypto-js');
const secretKey = 'your-secret-key';

function encryptMessage(message) {
  return CryptoJS.AES.encrypt(message, secretKey).toString();
}

function decryptMessage(encryptedText) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const testMessage = 'Test message';
const encryptedMessage = encryptMessage(testMessage);
const decryptedMessage = decryptMessage(encryptedMessage);

console.log('Original:', testMessage);
console.log('Encrypted:', encryptedMessage);
console.log('Decrypted:', decryptedMessage);
console.assert(testMessage === decryptedMessage, 'Decryption failed');
