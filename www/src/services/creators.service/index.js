const { Creator } = require('../../model/creator.schema');
const { BadRequest } = require('http-errors');

const removeAllCreators = async () => {
  try {
    return await Creator.deleteMany({});
  } catch (error) {
    return error;
  }
};

const getAllCreators = async () => {
  try {
    return await Creator.find({}).sort('name');
  } catch (error) {
    return error;
  }
};

const addCreator = async (req, _, next) => {
  try {
    const { name } = req.body;

    const creator = await Creator.findOne({ name });

    if (creator) {
      return new BadRequest('Creator with this name has already existed');
    }

    const newCreator = new Creator({ name });

    return await newCreator.save();
  } catch (error) {
    return error;
  }
};

const removeCreatorsByIds = async (params) => {
  try {
    const ids = typeof params?.ids === 'string' ? params?.ids : '';
    return await Creator.deleteMany({ _id: { $in: ids.split(',') } });
  } catch (error) {
    return error;
  }
};

module.exports = { removeAllCreators, addCreator, removeCreatorsByIds, getAllCreators };
