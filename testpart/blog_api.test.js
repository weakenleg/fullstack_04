const supertest = require('supertest');
const app = require('../index'); 
const api = supertest(app);

describe('GET /api/blogs', () => {
  test('should return the correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveLength(7); // Replace with the expected number of blog posts

    // You can also add additional assertions to check the response body or other properties
    // For example:
    // expect(response.body[0].title).toBe('First Blog');
    // expect(response.body[1].author).toBe('John Doe');
  },10000);
  test('blog posts have unique identifier named id', async () => {
    const response = await api.get('/api/blogs');
  
    expect(response.body[0].id).toBeDefined();
  });
});
test('creating a new blog post', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 10,
  };

  const initialBlogs = await api.get('/api/blogs');

  const response = await api.post('/api/blogs').send(newBlog);
  expect(response.status).toBe(201);

  const updatedBlogs = await api.get('/api/blogs');
  expect(updatedBlogs.body).toHaveLength(initialBlogs.body.length + 1);

  const titles = updatedBlogs.body.map((blog) => blog.title);
  expect(titles).toContain('Test Blog');
});
test('default likes to 0 if missing from request', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com',
  };

  const response = await api.post('/api/blogs').send(newBlog);
  expect(response.status).toBe(201);
  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);

});
test('returns 400 Bad Request if title or url is missing', async () => {
  const newBlog = {
    author: 'John Doe',
    likes: 10,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});


test('deletes a single blog post', async () => {
  const blogsBeforeDelete = await api.get('/api/blogs');
  const blogToDelete = blogsBeforeDelete.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAfterDelete = await api.get('/api/blogs');
  const deletedBlog = blogsAfterDelete.body.find((blog) => blog.id === blogToDelete.id);

  expect(deletedBlog).toBeUndefined();
});


test('updates a single blog post', async () => {
  const blogsBeforeUpdate = await api.get('/api/blogs');
  const blogToUpdate = blogsBeforeUpdate.body[0];

  const updatedBlogData = {
    title: 'Updated Blog',
    author: 'John Doe',
    url: 'https://updated-example.com',
    likes: 20,
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const updatedBlog = response.body;

  expect(updatedBlog.title).toBe(updatedBlogData.title);
  expect(updatedBlog.author).toBe(updatedBlogData.author);
  expect(updatedBlog.url).toBe(updatedBlogData.url);
  expect(updatedBlog.likes).toBe(updatedBlogData.likes);
});



