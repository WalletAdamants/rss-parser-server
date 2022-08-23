const { Admin } = require('../../model/admin.schema');
const TokenService = require('../token.service');

const login = async ({ email }) => {
  try {
    const admin = await Admin.findOne({ email });

    const tokens = TokenService.generateTokens(admin.email);

    await TokenService.saveRefreshToken(admin._id, tokens.refreshToken);

    return { admin, tokens };
  } catch (error) {
    return error;
  }
};

module.exports = { login };
