// const { cookieOptions } = require("../../config");
const AdminService = require('../../services/admin.service/index');
const { isErrorOrFalsyValue, responseWithError } = require('../../helpers/controller.helpers');

const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;

  const refreshData = await AdminService.refresh(refreshToken);

  if (isErrorOrFalsyValue(refreshData)) {
    return responseWithError(refreshData, next);
  }

  const {
    admin: { email },
    tokens,
  } = refreshData;
  // res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
  res.status(200).json({
    message: 'success',
    data: {
      admin: {
        email,
      },
      tokens,
    },
  });
};

module.exports = { refresh };
