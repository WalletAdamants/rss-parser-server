const { BadRequest } = require('http-errors');

const { Post } = require('../../model/post.schema');

const addPost = async (req) => {
  try {
    const { title, description, image, categories, link, publication_date, creator } = req.body;

    const currentPost = await Post.findOne({ title });

    if (currentPost) {
      return new BadRequest('Post with this title has already existed');
    }

    const newPost = new Post({ title, description, image, categories, link, publication_date, creator });
    return newPost.save();
  } catch (error) {
    return error;
  }
};

module.exports = { addPost };
