const { parentPort } = require('worker_threads');

const { getRssBatch } = require('../../api/api');
const { prepareNewCreators, prepareNewCategories } = require('../../helpers/service.helpers');

(async function () {
  try {
    // TODO: remove logs
    console.log('Start parsing...' + '\n');
    console.time('parsing');
    const rssDataArray = await getRssBatch();

    if (!Array.isArray(rssDataArray) || !rssDataArray.length) {
      return parentPort.postMessage(null);
    }

    const newCreators = prepareNewCreators(rssDataArray);
    const newCategories = prepareNewCategories(rssDataArray);

    // TODO: remove logs
    console.log('End parsing...' + '\n');
    console.timeEnd('parsing');
    parentPort.postMessage({ newCreators, newCategories, rssDataArray });
  } catch (error) {
    console.log('Worker error: ', error);
  }
})();
