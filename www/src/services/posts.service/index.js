const { addPost } = require('./addPost.service');
const { getAllPosts } = require('./getAllPosts.service');
const { removePost } = require('./removePost.service');
const { getPostById } = require('./getPostById.service');
const { updatePost } = require('./updatePost.service');
const { removeAllPosts } = require('./removeAllPosts.service');
const { loadPostsBatch } = require('./loadPostsBatch.service');

module.exports = {
  addPost,
  getAllPosts,
  removePost,
  getPostById,
  updatePost,
  removeAllPosts,
  loadPostsBatch,
};
