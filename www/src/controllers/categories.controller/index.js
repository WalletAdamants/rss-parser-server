const { CategoryService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers/controller.helpers');

const addCategory = async (req, res, next) => {
  const category = await CategoryService.addCategory(req);

  if (isErrorOrFalsyValue(category)) {
    return next(category);
  }

  res.status(201).json({ message: 'success', data: category });
};

const getAllCategories = async (_, res, next) => {
  const categories = await CategoryService.getAllCategories();

  if (isErrorOrFalsyValue(categories)) {
    return next(categories);
  }

  res.status(200).json({ message: 'success', data: { categories, total: categories.length } });
};

const removeCategoriesByIds = async (req, res, next) => {
  const categories = await CategoryService.removeCategoriesByIds(req.params);

  if (isErrorOrFalsyValue(categories)) {
    return next(categories);
  }

  res.status(200).json({ message: 'success' });
};

module.exports = { addCategory, getAllCategories, removeCategoriesByIds };
