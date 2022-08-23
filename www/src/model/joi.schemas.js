const joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const joiUserBodySchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
});

const joiPostSchema = joi.object({
  _id: joi.string().hex().length(24),

  title: joi.string().max(255).required(),

  description: joi.string().max(1000).required(),

  link: joi.string().max(255).required(),

  categories: joi.array().items(joi.string().hex().length(24)).required(),

  publication_date: joi.date().required(),

  creator: joi.string().hex().length(24).required(),

  image: joi.string().max(255),

  user: joiUserBodySchema,
});

const joiAdminSchema = joi.object({
  name: joi.string().max(30).empty(''),

  email: joi.string().email({ minDomainSegments: 2 }).required(),

  password: PasswordComplexity({
    min: 6,
    max: 12,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  }).required(),
});

const joiOptionSchema = joi.object({
  name: joi.string().min(3).max(30).required(),

  user: joiUserBodySchema,
});

const joiObjectIdSchema = joi.object({
  id: joi.string().hex().length(24).required(),

  user: joiUserBodySchema,
});

module.exports = {
  joiPostSchema,
  joiAdminSchema,
  joiOptionSchema,
  joiObjectIdSchema,
};
