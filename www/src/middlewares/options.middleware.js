const { BadRequest } = require('http-errors');

const { responseErrorOrNext, validateObject } = require('../helpers/middleware.helpers');
const { joiOptionSchema, joiObjectIdSchema } = require('../model/joi.schemas');

const validateNewOption = async (req, res, next) => {
  try {
    const { error } = validateObject(req.body, joiOptionSchema);

    responseErrorOrNext(error, res, next);
  } catch (error) {
    console.log(error);
  }
};

const validateOptionId = async (req, res, next) => {
  try {
    const ids = req.params?.ids;
    if (!Array.isArray(ids.split(','))) {
      next(new BadRequest('No ids found'));
    }
    const errArr = ids.split(',').map((id) => {
      const { error } = validateObject({ id }, joiObjectIdSchema);
      return error;
    });

    const error = errArr.find((err) => !!err);

    responseErrorOrNext(error, res, next);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  validateNewOption,
  validateOptionId,
};
