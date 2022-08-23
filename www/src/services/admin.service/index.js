const { registration } = require('./registration.service');
const { login } = require('./login.service');
const { verify } = require('./verify.service');
const { logout } = require('./logout.service');
const { refresh } = require('./refresh.service');

module.exports = {
  registration,
  login,
  verify,
  logout,
  refresh,
};
