const express = require('express');

const PostsController = require('../controllers/posts.controllers/index');
const { callbackWrapper } = require('../helpers/callbackWrapper');
const { validateNewPost } = require('../middlewares/addPost.middleware');
const { authenticateUser } = require('../middlewares/admin.middleware');

const postsRouter = express.Router();

postsRouter.get('/batch', callbackWrapper(PostsController.loadPostsBatch));

postsRouter.post('/', callbackWrapper(authenticateUser, validateNewPost, PostsController.addPost));
postsRouter.get('/', callbackWrapper(PostsController.getAllPosts));
postsRouter.get('/:postId', callbackWrapper(PostsController.getPostById));
postsRouter.delete('/all_posts', callbackWrapper(authenticateUser, PostsController.removeAllPosts));
postsRouter.delete('/:postId', callbackWrapper(authenticateUser, PostsController.removePost));
postsRouter.patch('/:postId', callbackWrapper(authenticateUser, validateNewPost, PostsController.updatePost));

module.exports = { postsRouter };
