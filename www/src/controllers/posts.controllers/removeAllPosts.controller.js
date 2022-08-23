const { PostsService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');
const { removeAllCategories } = require('../../services/categories.service');
const { removeAllCreators } = require('../../services/creators.service');

const removeAllPosts = async (_, res, next) => {
  const posts = await PostsService.removeAllPosts();
  removeAllCategories();
  removeAllCreators();

  if (isErrorOrFalsyValue(posts)) {
    return next(posts);
  }

  res.status(200).json({
    message: 'success',
    data: {
      deleted: posts?.deletedCount,
    },
  });
};

module.exports = { removeAllPosts };
