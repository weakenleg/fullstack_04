const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controlpart/blog');
const usersRouter = require('./controlpart/users');
const bodyParser = require('body-parser');
const loginRouter = require('./controlpart/login');
const middleware = require('./utils/auth')

require('dotenv').config();



const url = process.env.MONGODB_URI;
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = 3003;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);
app.use(cors());



module.exports = app;


