import { db } from '../database/database.js'

export async function getGames(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM games;')
    res.status(200).send(rows)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = res.locals.game
  try {
    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay")
       VALUES ($1, $2, $3, $4)`,
      [name, image, stockTotal, pricePerDay]
    )
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(500)
  }
}
