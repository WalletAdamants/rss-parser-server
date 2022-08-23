const path = require('path');
const schedule = require('node-schedule');
const { Worker } = require('worker_threads');

const { Post } = require('../../model/post.schema');
const { Creator } = require('../../model/creator.schema');
const { Category } = require('../../model/category.schema');
const { RSS_NODE_SCHEDULE = '0 * * * *' } = require('../../config/config');

const workerFilePath = path.resolve(__dirname, 'schedule.worker.js');

const loadRssPosts = schedule.scheduleJob(RSS_NODE_SCHEDULE, async () => {
  try {
    const worker = new Worker(workerFilePath);
    worker.on('message', (data) => {
      if (!data) {
        console.log('schedule.scheduleJob: Can`t parse RSS.');
        return;
      }

      const { newCreators, newCategories, rssDataArray } = data;
      Category.insertMany(newCategories, { ordered: false }, (err) => {
        if (err && err?.code !== 11000) console.log(err);
      });
      Creator.insertMany(newCreators, { ordered: false }, (err) => {
        if (err && err?.code !== 11000) console.log(err);
      });

      rssDataArray.forEach(async (post) => {
        const currentPost = await Post.findOne({ title: post.title });

        if (!currentPost) {
          const creator = await Creator.findOne({ name: post.creator });
          const categories = await Category.find({ name: { $in: post.categories } }, '_id');
          const newPost = new Post({ ...post, creator, categories });

          await newPost.save((err) => {
            if (err && err?.code !== 11000) console.log('New Post insertion error:', err);
          });
        }
      });
    });
    worker.on('error', (err) => console.log(err));
  } catch (error) {
    if (error && error?.code !== 11000) console.log('Saving parsed data error: ', error);
  }
});

module.exports = { loadRssPosts };
