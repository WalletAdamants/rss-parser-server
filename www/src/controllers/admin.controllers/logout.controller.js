const AdminService = require('../../services/admin.service/index');
const { isErrorOrFalsyValue, responseWithError } = require('../../helpers/controller.helpers');

const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  const obj = await AdminService.logout(refreshToken);

  if (isErrorOrFalsyValue(obj)) {
    return responseWithError(obj, next);
  }

  // res.clearCookie('refreshToken');
  res.status(204).json();
};

module.exports = { logout };
