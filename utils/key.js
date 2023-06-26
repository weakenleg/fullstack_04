const crypto = require('crypto');
const generateSecretKey = () => {
    const secretBytes = crypto.randomBytes(32);
    return secretBytes.toString('hex');
  };
  
  const secretKey = generateSecretKey();
  console.log('Secret Key:', secretKey);
  