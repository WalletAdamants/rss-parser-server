const { Post } = require('../../model/post.schema');
const {
  isValidPaginationInRequest,
  isValidSearchInRequest,
  isValidSortInRequest,
  isValidFilterInRequest,
  getPageAndLimitFromRequest,
  getFilterOptions,
  isValidDateFilterInRequest,
  getDateFilterOptions,
  getSearchFromRequest,
} = require('../../helpers/service.helpers');

const getAllPosts = async (req) => {
  try {
    const paginationOptions = { page: 1, limit: 25 };
    const searchOptions = {};
    const sortOptions = {};
    let filterOptions = {};

    if (isValidPaginationInRequest(req)) {
      const { page, limit } = getPageAndLimitFromRequest(req);

      paginationOptions.skip = (page - 1) * limit;
      paginationOptions.limit = limit;
      paginationOptions.page = page;
    }

    if (isValidSearchInRequest(req)) {
      searchOptions.search = getSearchFromRequest(req);
    }

    if (isValidSortInRequest(req)) {
      sortOptions[req.query.sortBy] = req.query.sortOrder;
    }

    if (isValidFilterInRequest(req)) {
      filterOptions = getFilterOptions(req);
    }

    if (isValidDateFilterInRequest(req)) {
      filterOptions.publication_date = getDateFilterOptions(req);
    }

    const posts = await Post.find(
      searchOptions.search ? { $text: { $search: searchOptions.search } } : filterOptions,
      null,
      paginationOptions
    )
      .sort(sortOptions)
      .populate('creator categories', 'name');

    const total =
      searchOptions.search || Object.keys(filterOptions).length
        ? await Post.count(
            searchOptions.search ? { $text: { $search: searchOptions.search } } : filterOptions,
            null,
            paginationOptions
          )
        : await Post.count({});

    return { posts, pagination: { page: paginationOptions.page, limit: paginationOptions.limit, total } };
  } catch (error) {
    return error;
  }
};

module.exports = { getAllPosts };
