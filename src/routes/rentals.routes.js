import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { createRentalsSchema } from '../schemas/rentals.schema.js'
import { validationCreateRentals } from '../middlewares/rentals.middleware.js'
import { createRentals } from '../controllers/rentals.controller.js'

const rentalsRouter = express.Router()

rentalsRouter.get('/rentals')
rentalsRouter.post(
  '/rentals',
  validateSchema(createRentalsSchema),
  validationCreateRentals,
  createRentals
)
rentalsRouter.post('/rentals/:id/return')
rentalsRouter.delete('/rentals/:id')

export default rentalsRouter
