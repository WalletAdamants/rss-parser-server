const { Post } = require('../../model/post.schema');

const updatePost = async ({ postId }, body) => {
  try {
    const post = await Post.findById({ _id: postId });

    if (!post) {
      return null;
    }

    Object.keys(body).forEach((key) => {
      if (body[key]) post[key] = body[key];
    });

    await post.save();

    return post;
  } catch (error) {
    return error;
  }
};

module.exports = { updatePost };
