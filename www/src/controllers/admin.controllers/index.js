const { logout } = require('./logout.controller');
const { login } = require('./login.controller');
const { registration } = require('./registration.controller');
const { verify } = require('./verify.controller');
const { refresh } = require('./refresh.controller');

module.exports = { logout, login, registration, verify, refresh };
