const { PostsService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');

const addPost = async (req, res, next) => {
  const post = await PostsService.addPost(req);

  if (isErrorOrFalsyValue(post)) {
    return next(post);
  }

  res.status(201).json({ message: 'success', data: post });
};

module.exports = { addPost };
