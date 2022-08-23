const AdminService = require('../../services/admin.service/index');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');
// const { cookieOptions } = require('../../config');

const registration = async (req, res, next) => {
  const serviceResponse = await AdminService.registration(req.body);

  if (isErrorOrFalsyValue(serviceResponse)) {
    return next(serviceResponse);
  }

  const {
    newAdmin: { email },
  } = serviceResponse;

  res.status(201).json({ message: 'success', data: { email } });
};

module.exports = { registration };
