const Joi = require('joi');

const userScheme = Joi.object({
    name: Joi.string().min(2).required(),
    secondName: Joi.string().min(5).required(),
    age: Joi.number().min(0).required(),
    city: Joi.string().min(2),
});

module.exports = { userScheme };
