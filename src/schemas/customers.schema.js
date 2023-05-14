import joi from 'joi'

export const createCustomersSchema = joi.object({
  name: joi.string().min(3).required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi.string().length(11).required(),
  birthday: joi.date().required()
})
