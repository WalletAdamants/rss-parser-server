const { PostsService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');

const getPostById = async (req, res) => {
  const { post, prev, next, total } = await PostsService.getPostById(req.params);

  if (isErrorOrFalsyValue(post)) {
    return res.status(400).json({ message: 'error', error: 'Post with this id not found' });
  }

  res.status(200).json({ message: 'success', data: { post, prev, next, total } });
};

module.exports = { getPostById };
