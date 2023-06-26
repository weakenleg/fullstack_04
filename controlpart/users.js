const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../model/users');
const Blog = require('../model/blog');



usersRouter.post('/', async (request, response) => {
    const { username, name, password, blogId } = request.body;
    const blog = await Blog.findById(blogId);
  
    if (!blog) {
      return response.status(400).json({ error: 'Invalid blog ID' });
    }
  
    if (!username || !password) {
      return response.status(400).json({ error: 'Username and password must be provided' });
    }
  
    if (username.length < 3 || password.length < 3) {
      return response.status(400).json({ error: 'Username and password must be at least 3 characters long' });
    }
  
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return response.status(400).json({ error: 'Username must be unique' });
    }
  
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
  
    const user = new User({
      username: username,
      name: name,
      passwordHash: passwordHash,
      blogs: blog._id // Set the user's blogs to an array containing the blog's ID or an empty array
    });
  
    try {
      const savedUser = await user.save();
      response.json(savedUser);
    } catch (error) {
      response.status(500).json({ error: 'Failed to create a new user' });
    }
  });
  
  

  
usersRouter.get('/', async (request, response) => {
    try {
      const users = await User.find({}).populate("blogs", "-user");
      response.json(users);
    } catch (error) {
      console.log('Error retrieving users:', error.message);
      response.status(500).send('Internal Server Error');
    }
  });
  
  usersRouter.delete('/:id', async (request, response) => {
    try {
      const deletedUser = await User.findByIdAndRemove(request.params.id);
  
      if (deletedUser) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.log('Error deleting user:', error.message);
      response.status(500).send('Internal Server Error');
    }
  });
  
  
  
module.exports = usersRouter;
