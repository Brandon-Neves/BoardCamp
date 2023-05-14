import joi from 'joi'

export const createGamesSchema = joi.object({
  name: joi.string().min(3).required(),
  image: joi.string().required(),
  stockTotal: joi.number().positive().required(),
  pricePerDay: joi.number().positive().required()
})
