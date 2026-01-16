const bcrypt = require('bcrypt');

const APP_PEPPER = "UygulamaGizliAnahtari123!"; 

async function generateSecureHash(userPassword) { 
    const costFactor = 12; 
    
    const dataToHash = userPassword + APP_PEPPER;

    const secureHash = await bcrypt.hash(dataToHash, costFactor);
    
    console.log("Orijinal Şifre:", userPassword);
    console.log("Hashlenmiş Şifre:", secureHash);
    return secureHash;
}

async function checkPassword(inputPassword, storedHashValue) {
    const isPasswordValid = await bcrypt.compare(inputPassword + APP_PEPPER, storedHashValue);
    
    console.log("Şifre Doğru mu?:", isPasswordValid ? "Evet" : "Hayır");
    return isPasswordValid;
}

(async () => {
    const generatedHash = await generateSecureHash("sifre123");
    await checkPassword("sifre123", generatedHash);
})();