import express from 'express'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import {
  validationCustomer,
  validationCustomerId,
  validationUpdateCustomer
} from '../middlewares/customers.middleware.js'
import {
  createCustomers,
  getCustomerId,
  getCustomers,
  updateCustomer
} from '../controllers/customers.controller.js'
import { createCustomersSchema } from '../schemas/customers.schema.js'

const customersRouter = express.Router()

customersRouter.get('/customers', getCustomers)
customersRouter.post(
  '/customers',
  validateSchema(createCustomersSchema),
  validationCustomer,
  createCustomers
)

customersRouter.get('/customers/:id', validationCustomerId, getCustomerId)
customersRouter.put(
  '/customers/:id',
  validateSchema(createCustomersSchema),
  validationUpdateCustomer,
  updateCustomer
)

export default customersRouter
