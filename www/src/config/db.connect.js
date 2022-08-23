const mongoose = require('mongoose');
const { DB_NAME, DB_URL, MODE, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = require('./config');

const DB_LOCAL_CONTAINER = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongo-db:27017/db-rss-posts?authSource=admin&readPreference=primary&directConnection=true&ssl=false`;

const connectDatabase = async () => {
  return MODE === 'dev'
    ? await mongoose.connect(DB_LOCAL_CONTAINER, { dbName: 'db-rss-posts', socketTimeoutMS: 60 * 1000 })
    : await mongoose.connect(DB_URL, { dbName: DB_NAME, socketTimeoutMS: 60 * 1000 });
};

const closeDbConnection = () => {
  mongoose.connection.close(function () {
    console.log('DB disconnected on app termination');
    process.exit(0);
  });
};

module.exports = { connectDatabase, closeDbConnection };
