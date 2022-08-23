const { NotFound } = require('http-errors');
const { Admin } = require('../../model/admin.schema');

const verify = async (verificationToken) => {
  try {
    const searchedUser = await Admin.findOneAndUpdate(
      { verificationToken },
      {
        verificationToken: null,
        emailVerified: true,
      },
      { new: true }
    );

    return !searchedUser ? new NotFound('User not found') : searchedUser;
  } catch (error) {
    return error;
  }
};

module.exports = { verify };
