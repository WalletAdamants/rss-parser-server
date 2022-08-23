const { BadRequest } = require('http-errors');

const { responseErrorOrNext, validateObject } = require('../helpers/middleware.helpers');
const { joiPostSchema } = require('../model/joi.schemas');

const validateNewPost = async (req, res, next) => {
 try {
  const { error } = validateObject(req.body, joiPostSchema);

  responseErrorOrNext(error, res, next);
 } catch (error) {
   console.log(error);
 }
};

module.exports = {
  validateNewPost,
};
