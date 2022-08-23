const { BadRequest, Unauthorized, NotFound, Forbidden } = require('http-errors');
const jwt = require('jsonwebtoken');

const { responseErrorOrNext, validateObject } = require('../helpers/middleware.helpers');
const { joiAdminSchema } = require('../model/joi.schemas');
const { Admin } = require('../model/admin.schema');
const { JWT_ACCESS_SECRET } = require('../config/config');
const { isTokenExpiredError, extractUserEmail } = require('../helpers/middleware.helpers');

const userLoginValidation = async (req, res, next) => {
  const requiredFields = ['email', 'password'];

  const { error } = validateObject(req.body, joiAdminSchema, requiredFields);

  responseErrorOrNext(error, res, next);
};

const userRegistrationValidation = async (req, res, next) => {
  const requiredFields = ['email', 'password', 'name'];

  const { error } = validateObject(req.body, joiAdminSchema, requiredFields);

  responseErrorOrNext(error, res, next);
};

const checkUserCredentials = async (req, _, next) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (!user) {
    return next(new NotFound(`User with email "${email}" not found`));
  }

  if (!user?.comparePassword(password)) {
    return next(new BadRequest(`Email or password is wrong`));
  }

  if (!user?.emailVerified) {
    return next(new Forbidden(`User email is not verified`));
  }

  next();
};

const authenticateUser = async (req, _, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new BadRequest('Bad Request: no authorization header presents'));
    }
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      return next(new BadRequest('Bad Request: no Bearer'));
    }

    const { payload: email } = jwt.verify(token, JWT_ACCESS_SECRET);

    const user = await Admin.findOne({ email });

    if (!user || !user.refreshToken) {
      return next(new NotFound('User not found'));
    }

    req.body.user = extractUserEmail(user);
  } catch (error) {
    isTokenExpiredError(error) ? next(new Unauthorized(`Unauthorized: ${error}`)) : next(error);
  }

  next();
};

module.exports = { checkUserCredentials, authenticateUser, userLoginValidation, userRegistrationValidation };
