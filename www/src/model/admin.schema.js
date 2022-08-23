const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_COUNT } = require('../config/constants');

const adminSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
      default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

adminSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_COUNT));
};

adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Admin = model('admin', adminSchema);

module.exports = { Admin };
