const { Post } = require('../../model/post.schema');

const removePost = async ({ postId }) => {
  try {
    return await Post.findOneAndRemove({ _id: postId });
  } catch (error) {
    return error;
  }
};

module.exports = { removePost };
