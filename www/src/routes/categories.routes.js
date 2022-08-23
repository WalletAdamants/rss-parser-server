const express = require('express');

const CategoriesController = require('../controllers/categories.controller/index');
const { callbackWrapper } = require('../helpers/callbackWrapper');
const { authenticateUser } = require('../middlewares/admin.middleware');
const { validateNewOption, validateOptionId } = require('../middlewares/options.middleware');

const categoriesRouter = express.Router();

categoriesRouter.post('/', callbackWrapper(authenticateUser, validateNewOption, CategoriesController.addCategory));
categoriesRouter.get('/', callbackWrapper(CategoriesController.getAllCategories));
categoriesRouter.delete(
  '/:ids',
  callbackWrapper(authenticateUser, validateOptionId, CategoriesController.removeCategoriesByIds)
);

module.exports = { categoriesRouter };
