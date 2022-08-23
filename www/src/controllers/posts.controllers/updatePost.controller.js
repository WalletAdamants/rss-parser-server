const { BadRequest } = require('http-errors');

const { PostsService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');
const { isDuplicateKeyError } = require('../../helpers/service.helpers');

const updatePost = async (req, res, next) => {
  const post = await PostsService.updatePost(req.params, req.body);

  if (isErrorOrFalsyValue(post)) {
    const error = post;
    return isDuplicateKeyError(error) ? next(new BadRequest('Post with this title has already existed.')) : next(error);
  }

  res.status(200).json({ message: 'success', data: post });
};

module.exports = { updatePost };
