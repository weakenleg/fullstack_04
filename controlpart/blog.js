const express = require('express');
const router = express.Router();
const Blog = require('../model/blog');
const User = require('../model/users'); // Make sure the User model is imported
const { tokenExtractor, userExtractor } = require('../utils/auth');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user", "-blogs");
    res.json(blogs);
  } catch (error) {
    console.log('Error retrieving blogs:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/',  async (req, res) => {
  const { title, author, url, likes } = req.body;
  console.log(title)
  const userId = req.body.userId; // Add this line to retrieve the userId from the request body
  // const decodedToken = jwt.verify(req.token, process.env.TOKEN_SECRET)
  

  if (!title || !url) {
    return res.status(400).json({ error: 'Title or URL is missing' });
  }

  const user = await User.findById(userId);
  console.log(user)
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: req.body.likes || 0,
    user: user._id, // Assign the user's ID as the creator of the blog
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.log('Error saving blog:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


router.delete('/:id', async (req, res) => {
  const user = await req.user

  try {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    if (deletedBlog) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    console.log('Error deleting blog:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


router.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, author, url, likes },
      { new: true }
    );

    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    console.log('Error updating blog:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
