const TokenService = require('../token.service');

const logout = async (refreshToken) => {
  try {
    console.log('refreshToken', refreshToken);
    return await TokenService.removeToken(refreshToken);
  } catch (error) {
    return error;
  }
};

module.exports = { logout };
