const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 5,
            __v: 0
          },
        //   {
        //     _id: "5a422aa71b54a676234d17f8",
        //     title: "Go To Statement Considered Harmful",
        //     author: "Edsger W. Dijkstra",
        //     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        //     likes: 5,
        //     __v: 0
        //   },
        //   {
        //     _id: "5a422b3a1b54a676234d17f9",
        //     title: "Canonical string reduction",
        //     author: "Edsger W. Dijkstra",
        //     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        //     likes: 12,
        //     __v: 0
        //   },
        //   {
        //     _id: "5a422b891b54a676234d17fa",
        //     title: "First class tests",
        //     author: "Robert C. Martin",
        //     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        //     likes: 10,
        //     __v: 0
        //   },
        //   {
        //     _id: "5a422ba71b54a676234d17fb",
        //     title: "TDD harms architecture",
        //     author: "Robert C. Martin",
        //     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        //     likes: 0,
        //     __v: 0
        //   },
        //   {
        //     _id: "5a422bc61b54a676234d17fc",
        //     title: "Type wars",
        //     author: "Robert C. Martin",
        //     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        //     likes: 2,
        //     __v: 0
        //   }  
    ];
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog);
      expect(result).toBe(5);
    });
  });
  
describe('favorite blog', () => {
const blogs = [
    {
    title: 'Blog 1',
    author: 'Author 1',
    likes: 10,
    },
    {
    title: 'Blog 2',
    author: 'Author 2',
    likes: 5,
    },
    {
    title: 'Blog 3',
    author: 'Author 3',
    likes: 8,
    },
];

test('returns the blog with the most likes when list has multiple blogs', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
    title: 'Blog 1',
    author: 'Author 1',
    likes: 10,
    });
});
});
describe('most blogs', () => {
const blogs = [
    {
    title: 'Blog 1',
    author: 'Author 1',
    },
    {
    title: 'Blog 2',
    author: 'Author 2',
    },
    {
    title: 'Blog 3',
    author: 'Author 1',
    },
    {
    title: 'Blog 4',
    author: 'Author 3',
    },
    {
    title: 'Blog 5',
    author: 'Author 1',
    },
];

test('returns the author with the most blogs when list has multiple authors', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
    author: 'Author 1',
    blogs: 3,
    });
});
});
describe('most likes', () => {
    test('when list has only one blog, equals the likes of that blog', () => {
      const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0,
        },
      ];
  
      const result = listHelper.mostLikes(blogs);
      expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
    });
  
    test('when list has multiple blogs, returns the author with the most likes', () => {
      const blogs = [
        {
          _id: '5a422a851b54a676234d17f7',
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7,
          __v: 0,
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0,
        },
        {
          _id: '5a422b3a1b54a676234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0,
        },
        {
          _id: '5a422b891b54a676234d17fa',
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
          likes: 10,
          __v: 0,
        },
        {
          _id: '5a422ba71b54a676234d17fb',
          title: 'TDD harms architecture',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
          likes: 0,
          __v: 0,
        },
      ];
  
      const result = listHelper.mostLikes(blogs);
      expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
    });
  
    test('when list is empty, returns null', () => {
      const blogs = [];
  
      const result = listHelper.mostLikes(blogs);
      expect(result).toBeNull();
    });
  });
    