const { PostsService } = require('../../services');

const loadPostsBatch = async (_, res) => {
  const { success = null, error = null, posts } = await PostsService.loadPostsBatch();

  console.log(success, error);

  if (!success) {
    return res.status(400).json({ message: 'error', error });
  }

  res.status(201).json({ message: 'success', posts });
};

module.exports = { loadPostsBatch };
