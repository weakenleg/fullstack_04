const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index.js');
const User = require('../model/users');

const api = supertest(app);

describe('User creation', () => {
  beforeEach(async () => {
    // Clear the users collection before each test
    await User.deleteMany({});
  });

  test('Creating a new user with missing username and password should return an error', async () => {
    const newUser = {
      password: '123456',
      name: 'John Doe',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toContain('Username and password must be provided');
  },10000);

  test('Creating a new user with username and password shorter than 3 characters should return an error', async () => {
    const newUser = {
      username: 'jo',
      password: 'pwsda',
      name: 'John Doe',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toContain('Username and password must be at least 3 characters long');
  });

  test('Creating a new user with a non-unique username should return an error', async () => {
    const existingUser = new User({
      username: 'john',
      passwordHash: '123456',
      name: 'John Doe',
    });
  
    await existingUser.save();
  
    const newUser = {
      username: 'john',
      password: '123456',
      name: 'John Doe1',
    };
  
    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toContain('Username must be unique');
  });
  
  
});
// describe('Adding a new blog', () => {
//   test('succeeds with valid data and bearer token', async () => {
//     const newBlog = {
//       title: 'Test Blog',
//       author: 'John Doe',
//       url: 'https://example.com',
//       likes: 0,
//     };

//     const response = await api
//       .post('/api/blogs')
//       .set('Authorization', 'Bearer your_bearer_token_here')
//       .send(newBlog)
//       .expect(201)
//       .expect('Content-Type', /application\/json/);

//     expect(response.body.title).toBe(newBlog.title);
//     expect(response.body.author).toBe(newBlog.author);
//     expect(response.body.url).toBe(newBlog.url);
//     expect(response.body.likes).toBe(newBlog.likes);
//   });

//   test('fails with status code 401 Unauthorized if bearer token is not provided', async () => {
//     const newBlog = {
//       title: 'Test Blog',
//       author: 'John Doe',
//       url: 'https://example.com',
//       likes: 0,
//     };

//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(401);
//   });
// });