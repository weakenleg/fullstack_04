const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a token for a given user

const generateToken = (user) => {
  const tokenData = {
    id: user.id,
    username: user.username,
  };
  console.log(jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' }))
  return jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

// Verify the authenticity of a token
const verifyToken = (token) => {
  console.log(process.env.TOKEN_SECRET)
  return jwt.verify(token, process.env.TOKEN_SECRET);
};

module.exports = { generateToken, verifyToken };
