const dummy = (blogs) => {
    return 1;
};

module.exports = {
  dummy,
};
//
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
//
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const favorite = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};
  
const _ = require('lodash');

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const blogCountByAuthor = _.groupBy(blogs, 'author');
  const authorWithMostBlogs = _.maxBy(_.map(blogCountByAuthor, (blogs, author) => ({ author, blogs: blogs.length })), 'blogs');

  return {
    author: authorWithMostBlogs.author,
    blogs: authorWithMostBlogs.blogs,
  };
};
  


const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupedByAuthor = _.groupBy(blogs, 'author');
  const authorsWithLikes = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes'),
  }));
  const authorWithMostLikes = _.maxBy(authorsWithLikes, 'likes');

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

  