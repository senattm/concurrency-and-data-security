const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = crypto.randomBytes(32); 
const IV_LENGTH = 16; 

function encryptData(plainText) {
    const iv = crypto.randomBytes(IV_LENGTH); 
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv); 
    
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
}

function decryptData(cipherText) {
    const textParts = cipherText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv); // [cite: 237]
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8'); 
    
    return decrypted; 
}

const originalData = "4543-9876-1234-5678";
const encryptedOutput = encryptData(originalData);
const decryptedOutput = decryptData(encryptedOutput);

console.log("Plaintext:", originalData); 
console.log("Ciphertext:", encryptedOutput); 
console.log("Decrypted Metin:", decryptedOutput); 