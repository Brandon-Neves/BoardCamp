import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { createRentalsSchema } from '../schemas/rentals.schema.js'
import {
  deleteRentalsId,
  validationCreateRentals,
  validationRentalsId
} from '../middlewares/rentals.middleware.js'
import {
  createRentals,
  deleteRentals,
  finalizeRentals,
  getRentals
} from '../controllers/rentals.controller.js'

const rentalsRouter = express.Router()

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post(
  '/rentals',
  validateSchema(createRentalsSchema),
  validationCreateRentals,
  createRentals
)
rentalsRouter.post('/rentals/:id/return', validationRentalsId, finalizeRentals)
rentalsRouter.delete('/rentals/:id', deleteRentalsId, deleteRentals)

export default rentalsRouter
