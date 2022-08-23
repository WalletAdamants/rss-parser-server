const { ALLOWED_DOMAINS } = require('./config');

const corsOptions = {
  origin: ALLOWED_DOMAINS,
  credentials: true,
};

module.exports = { corsOptions };
