import express from 'express'
import { createGame, getGames } from '../controllers/games.controller.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { createGamesSchema } from '../schemas/games.schema.js'
import { validationGame } from '../middlewares/games.middleware.js'

const gamesRouter = express.Router()

gamesRouter.get('/games', getGames)
gamesRouter.post(
  '/games',
  validateSchema(createGamesSchema),
  validationGame,
  createGame
)

export default gamesRouter
