const Joi = require('@hapi/joi');
const { nextTick } = require('async');
const generateToken =require('../../utils/generateToken');

const validation = Joi.object({
    name: Joi.string().alphanum().min(3).max(25).trim(true),
    email: Joi.string().when('role', {
        is: ['admin', 'superAdmin'],
        then: Joi.string().regex(/^[a-z0-9]+@codi.tech$/),
      }),
    password:Joi.string()
    .min(8)
    .max(32)
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string().default('user').valid('admin', 'superAdmin', 'user'),
  
})
const userValidation = (req, res ,next) => {
  const { error } = validation.validate(req.body);
  if (error) return res.status(400).send(error.message)
  else next()
}

  module.exports =userValidation;