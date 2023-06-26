const jwt = require('jsonwebtoken');
const User = require('../model/users');
require('dotenv').config();

const userExtractor = async (request, response, next) => {
  if (request.token) {
    try {
      const decodedToken = jwt.verify(request.token, process.env.TOKEN_SECRET);
      request.user = await User.findById(decodedToken.id);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7);
    } else {
      request.token = null;
    }
    next();
  };
  module.exports = { tokenExtractor, userExtractor };
