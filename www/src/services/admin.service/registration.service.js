const { v4 } = require('uuid');
const { BadRequest } = require('http-errors');

const { Admin } = require('../../model/admin.schema');
const { isDuplicateKeyError } = require('../../helpers/service.helpers');
const { mailService } = require('../mail.service/index');
const TokenService = require('../token.service');

const registration = async (body) => {
  try {
    const { email, password, name } = body;
    const verificationToken = v4();
    const tokens = TokenService.generateTokens(email);
    const { refreshToken } = tokens;

    const newAdmin = new Admin({
      name,
      email,
      verificationToken,
      refreshToken,
    });

    newAdmin.setPassword(password);

    await newAdmin.save();

    await mailService.sendActivationMail(email, verificationToken);

    return { newAdmin, tokens };
  } catch (error) {
    return isDuplicateKeyError(error) ? new BadRequest('User with same email has already existed.') : error;
  }
};

module.exports = { registration };
