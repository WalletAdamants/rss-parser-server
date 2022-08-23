const { Category } = require('../../model/category.schema');
const { BadRequest } = require('http-errors');

const removeAllCategories = async () => {
  try {
    return await Category.deleteMany({});
  } catch (error) {
    return error;
  }
};

const getAllCategories = async () => {
  try {
    return await Category.find({}).sort('name');
  } catch (error) {
    return error;
  }
};

const addCategory = async (req) => {
  try {
    const { name } = req.body;

    const category = await Category.findOne({ name });

    if (category) {
      return new BadRequest('Category with this name has already existed');
    }

    const newCategory = new Category({ name });
    return await newCategory.save();
  } catch (error) {
    return error;
  }
};

const removeCategoriesByIds = async (params) => {
  try {
    const ids = typeof params?.ids === 'string' ? params?.ids : '';
    return await Category.deleteMany({ _id: { $in: ids.split(',') } });
  } catch (error) {
    return error;
  }
};

module.exports = { removeAllCategories, addCategory, removeCategoriesByIds, getAllCategories };
