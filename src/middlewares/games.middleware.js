import { db } from '../database/database.js'

export async function validationGame(req, res, next) {
  const game = req.body
  const { name } = req.body

  try {
    const gameExists = await db.query(`SELECT * FROM games WHERE name = $1;`, [
      name
    ])
    if (gameExists.rowCount !== 0) {
      return res.sendStatus(409)
    }
    res.locals.game = game
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
