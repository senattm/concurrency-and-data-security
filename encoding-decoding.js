function encodeBase64(plainText) {
   
    const buffer = Buffer.from(plainText, 'utf8'); 
   
    const encoded = buffer.toString('base64'); 
    
    return encoded; 
}

function decodeBase64(encodedText) {
    const buffer = Buffer.from(encodedText, 'base64');
    
    const decoded = buffer.toString('utf8');
    
    return decoded;
}

const originalMessage = "merhaba"; 
const encodedMessage = encodeBase64(originalMessage);
const decodedMessage = decodeBase64(encodedMessage);

console.log("Orijinal Metin:", originalMessage);
console.log("Base64 Encoded:", encodedMessage); 
console.log("Decoded Metin:", decodedMessage);