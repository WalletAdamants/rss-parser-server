const { Creator } = require('../model/creator.schema');
const { Category } = require('../model/category.schema');

const SORT_ORDER_ARR = ['asc', 'desc'];
const SORT_TYPES_ARR = ['publication_date', 'createdAt', 'title'];
const FILTER_TYPES_ARR = ['creator', 'categories'];
const DATE_FILTER_ARR = ['startDate', 'endDate'];
const EMPTY_OPTION = '[]';

const isDuplicateKeyError = (error) => error.code === 11000;

const isValidPaginationInRequest = (req) => {
  if ('page' in req.query && 'limit' in req.query) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    return page > 0 && limit > 0;
  }
  return false;
};

const isValidSearchInRequest = (req) => {
  if ('search' in req.query) {
    return req.query.search.length > 2;
  }
  return false;
};

const isValidSortInRequest = (req) => {
  if ('sortBy' in req.query && 'sortOrder' in req.query) {
    return SORT_TYPES_ARR.includes(req.query.sortBy) && SORT_ORDER_ARR.includes(req.query.sortOrder);
  }
  return false;
};

const isValidFilterInRequest = (req) => {
  if (
    Object.keys(req.query).some(
      (key) =>
        (FILTER_TYPES_ARR.includes(key) && req.query[key].length > 2) || req.query[key].indexOf(EMPTY_OPTION) !== -1
    )
  ) {
    return true;
  }

  return false;
};

const isValidDateFilterInRequest = (req) => {
  if (Object.keys(req.query).some((key) => DATE_FILTER_ARR.includes(key))) {
    return true;
  }
  return false;
};

const getFilterOptions = (req) => {
  const res = Object.keys(req.query)
    .filter((key) => FILTER_TYPES_ARR.includes(key))
    .map((key) => {
      if (req.query[key] === EMPTY_OPTION) {
        return { [key]: [] };
      }
      if (req.query[key].includes(EMPTY_OPTION)) {
        return {
          $or: [{ [key]: { $in: req.query[key].split(',').filter((i) => i !== EMPTY_OPTION) } }, { [key]: [] }],
        };
      }

      return { [key]: { $in: req.query[key].split(',') } };
    });

  return Object.assign({}, {}, ...res);
};

const getDateFilterOptions = (req) => {
  const { startDate, endDate } = req.query;

  const gte = startDate ? { $gte: startDate } : null;
  const lte = endDate ? { $lte: endDate } : null;

  return { ...gte, ...lte };
};

const getPageAndLimitFromRequest = (req) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  return { page, limit };
};

const getSearchFromRequest = (req) => {
  try {
    const parsedSearch = JSON.parse(req.query.search);
    return parsedSearch['search'];
  } catch (error) {
    console.log('getSearchFromRequest: ', error);
  }
};

const prepareNewCreators = (rssDataArr = []) => {
  return [...new Set(rssDataArr.map((post) => post?.creator))].map((name) => ({ name }));
};

const prepareNewCategories = (rssDataArr = []) => {
  return [
    ...new Set(
      rssDataArr.reduce((acc, post) => {
        acc.push(...post.categories);
        return acc;
      }, [])
    ),
  ].map((name) => ({ name }));
};

const saveCreator = async (creator) => {
  const currentCreator = await Creator.findOne({ name: creator });
  if (!currentCreator) {
    const newCreator = new Creator({ name: creator });
    await newCreator.save();
  }
};

const saveCategory = async (category) => {
  const currentCategory = await Category.findOne({ name: category });
  if (!currentCategory) {
    const newCategory = new Category({ name: category });
    await newCategory.save();
  }
};

module.exports = {
  isDuplicateKeyError,
  isValidPaginationInRequest,
  isValidSearchInRequest,
  getPageAndLimitFromRequest,
  isValidSortInRequest,
  isValidFilterInRequest,
  getFilterOptions,
  isValidDateFilterInRequest,
  getDateFilterOptions,
  getSearchFromRequest,
  saveCreator,
  saveCategory,
  prepareNewCreators,
  prepareNewCategories,
};
