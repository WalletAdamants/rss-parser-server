const express = require('express');

const AdminController = require('../controllers/admin.controllers/index');
const { callbackWrapper } = require('../helpers/callbackWrapper');
const {
  userLoginValidation,
  userRegistrationValidation,
  checkUserCredentials,
  authenticateUser,
} = require('../middlewares/admin.middleware');

const adminRouter = express.Router();

adminRouter.post('/login', callbackWrapper(userLoginValidation, checkUserCredentials, AdminController.login));
adminRouter.post('/logout', callbackWrapper(authenticateUser, AdminController.logout));
adminRouter.post('/registration', callbackWrapper(userRegistrationValidation, AdminController.registration));
adminRouter.get('/verify/:verificationToken', callbackWrapper(AdminController.verify));
adminRouter.post('/refresh', callbackWrapper(AdminController.refresh));

module.exports = { adminRouter };
