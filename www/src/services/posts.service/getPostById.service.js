const { Post } = require('../../model/post.schema');

const getPostById = async ({ postId }) => {
  try {
    const post = await Post.findById({ _id: postId }).populate('categories creator', 'name');
    if (!post) {
      return { post };
    }

    const nextPost = await Post.find({ _id: { $gt: post._id } })
      .limit(1)
      .populate('categories creator', 'name');
    const prevPost = await Post.find({ _id: { $lt: post._id } })
      .limit(1)
      .populate('categories creator', 'name');
    const total = await Post.count({});
    //
    return { post, next: nextPost.pop() || null, prev: prevPost.pop() || null, total };
  } catch (error) {
    return error;
  }
};

module.exports = { getPostById };
