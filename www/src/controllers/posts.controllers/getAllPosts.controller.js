const { PostsService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');

const getAllPosts = async (req, res, next) => {
  const { posts, pagination } = await PostsService.getAllPosts(req);

  if (isErrorOrFalsyValue(posts)) {
    return next(posts);
  }

  res.status(200).json({ message: 'success', data: { posts, pagination } });
};

module.exports = { getAllPosts };
