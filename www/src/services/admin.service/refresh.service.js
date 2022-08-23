const { Unauthorized } = require('http-errors');

const { Admin } = require('../../model/admin.schema');
const TokenService = require('../token.service/index');

const refresh = async (refreshToken) => {
  try {
    if (!refreshToken) {
      return new Unauthorized('No refresh token');
    }

    const data = TokenService.validateRefreshToken(refreshToken);
    const adminByToken = await TokenService.findAdminByToken(refreshToken);

    // console.log('refreshToken', refreshToken);
    // console.log('data', data);
    // console.log('adminByToken', adminByToken);


    if (!data || !adminByToken) {
      return new Unauthorized('Unauthorized');
    }

    const admin = await Admin.findById(adminByToken._id);
    const tokens = TokenService.generateTokens(admin.email);
    await TokenService.saveRefreshToken(admin._id, tokens.refreshToken);

    return { admin, tokens };
  } catch (error) {
    return error;
  }
};

module.exports = { refresh };
