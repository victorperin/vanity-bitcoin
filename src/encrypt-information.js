const fs = require('fs');
const ursa = require('ursa');

const publicKeyFileContent = fs.readFileSync('./teste.pub');
const publicKey = ursa.createPublicKey(publicKeyFileContent);

module.exports = (text) =>
  publicKey.encrypt(text, 'utf8', 'base64');
