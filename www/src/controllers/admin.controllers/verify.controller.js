const path = require('path');
const AdminService = require('../../services/admin.service/index');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');

const successVerificationFile = path.join(__dirname, '../../static/success.html');
const notFoundFile = path.join(__dirname, '../../static/notFound.html');

const verify = async (req, res, _) => {
  const { verificationToken } = req.params;

  const user = await AdminService.verify(verificationToken);

  if (isErrorOrFalsyValue(user)) {
    return res.status(404).sendFile(notFoundFile);
  }

  res.status(200).sendFile(successVerificationFile);
};

module.exports = { verify };
