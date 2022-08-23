const AdminService = require('../../services/admin.service/index');
const { isErrorOrFalsyValue, responseWithError } = require('../../helpers/controller.helpers');

const login = async (req, res, next) => {
  const { admin, tokens } = await AdminService.login(req.body);

  if (isErrorOrFalsyValue(admin)) {
    return responseWithError(admin, next);
  }

  const { email, emailVerified } = admin;

  // res.cookie('refreshToken', refreshToken, cookieOptions);
  res.status(200).json({
    message: 'success',
    data: {
      admin: {
        email,
        emailVerified,
      },
      tokens,
    },
  });
};

module.exports = { login };
