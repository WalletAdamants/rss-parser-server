const express = require('express');

const CreatorController = require('../controllers/creators.controller/index');
const { callbackWrapper } = require('../helpers/callbackWrapper');
const { authenticateUser } = require('../middlewares/admin.middleware');
const { validateNewOption, validateOptionId } = require('../middlewares/options.middleware');

const creatorsRouter = express.Router();

creatorsRouter.post('/', callbackWrapper(authenticateUser, validateNewOption, CreatorController.addCreator));
creatorsRouter.get('/', callbackWrapper(CreatorController.getAllCreators));
creatorsRouter.delete(
  '/:ids',
  callbackWrapper(authenticateUser, validateOptionId, CreatorController.removeCreatorsByIds)
);

module.exports = { creatorsRouter };
