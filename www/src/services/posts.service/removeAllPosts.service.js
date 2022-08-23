const { Post } = require('../../model/post.schema');

const removeAllPosts = async () => {
  try {
    return await Post.deleteMany({});
  } catch (error) {
    return error;
  }
};

module.exports = { removeAllPosts };
