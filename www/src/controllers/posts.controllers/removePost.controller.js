const { PostsService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');

const removePost = async (req, res) => {
  const post = await PostsService.removePost(req.params);

  console.log('post', post + '\n');
  if (isErrorOrFalsyValue(post)) {
    return res.status(400).json({ message: 'error', error: 'Post with this id not found' });
  }

  res.status(200).json({ message: 'success', data: post });
};

module.exports = { removePost };
