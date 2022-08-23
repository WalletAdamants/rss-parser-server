const { Post } = require('../../model/post.schema');
const { getRssBatch } = require('../../api/api');
const { Creator } = require('../../model/creator.schema');
const { Category } = require('../../model/category.schema');

const loadPostsBatch = async () => {
  try {
    // TODO: remove logs
    console.log('start parsing...' + '\n');
    console.time('1');
    const rssDataArray = await getRssBatch();

    if (!Array.isArray(rssDataArray) || !rssDataArray.length) {
      return null;
    }

    // const newCreators = prepareNewCreators(rssDataArray);
    // const newCategories = prepareNewCategories(rssDataArray);

    // await Category.insertMany(newCategories, (err) => {
    //   if (err && err?.code !== 11000) console.log(err);
    // });
    // await Creator.insertMany(newCreators, (err) => {
    //   if (err && err?.code !== 11000) console.log(err);
    // });

    const posts = [];
    rssDataArray.forEach(async (post) => {
      const currentPost = await Post.findOne({ title: post.title });

      if (!currentPost) {
        console.log('RSS !currentPost: ', currentPost + '\n');
        const creator = await Creator.findOne({ name: post.creator });
        const categories = await Category.find({ name: { $in: post.categories } }, '_id');
        const newPost = new Post({ ...post }).populate('creator', '_id');
        console.log(newPost);
        posts.push(newPost);
        // await newPost.save((err) => {
        //   if (err) console.log('RSS insert error:', err);
        // });
      }
    });
    // TODO: remove logs
    console.log('End parsing...' + '\n');
    console.timeEnd('1');

    return { success: true, posts };
  } catch (error) {
    return { success: false, error };
  }
};

module.exports = { loadPostsBatch };
