const { BadRequest } = require('http-errors');

const responseErrorOrNext = (error, _, next) => {
  if (error) {
    const { message } = error.details[0];
    next(new BadRequest(message));
  }

  next();
};

const validateObject = (obj, joiSchema, requiredFields = []) => {
  let objectSchema = Object.create(joiSchema);

  objectSchema = objectSchema.fork(requiredFields, (field) => field.required());

  return objectSchema.validate(obj);
};

const isTokenExpiredError = (error) => error.toString().includes('TokenExpiredError');

const extractUserEmail = (user) => {
  if('email' in user) {
    return { email: user.email };
  }

  return {};
}

module.exports = { responseErrorOrNext, validateObject, isTokenExpiredError, extractUserEmail };
