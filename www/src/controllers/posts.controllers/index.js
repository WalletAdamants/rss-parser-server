const { addPost } = require('./addPost.controller');
const { getAllPosts } = require('./getAllPosts.controller');
const { removePost } = require('./removePost.controller');
const { getPostById } = require('./getPostById.controller');
const { updatePost } = require('./updatePost.controller');
const { removeAllPosts } = require('./removeAllPosts.controller');
const { loadPostsBatch } = require('./loadPostsBatch.controller');

module.exports = {
  addPost,
  getAllPosts,
  removePost,
  getPostById,
  updatePost,
  removeAllPosts,
  loadPostsBatch,
};
