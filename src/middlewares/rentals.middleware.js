import { db } from '../database/database.js'

export async function validationCreateRentals(req, res, next) {
  const { customerId, gameId, daysRented } = req.body
  try {
    const customerIsExist = await db.query(
      `SELECT * FROM customers WHERE id = $1`,
      [customerId]
    )
    const { rows } = await db.query(`SELECT * FROM games WHERE id = $1`, [
      gameId
    ])

    if (customerIsExist.rows.length === 0) {
      return res.sendStatus(400)
    }
    if (rows.length === 0) {
      return res.sendStatus(400)
    }
    if (rows[0].stockTotal <= 0) return res.sendStatus(400)
    const price = rows[0].pricePerDay
    const newPrice = price * daysRented

    const rentals = {
      customerId,
      gameId,
      daysRented,
      newPrice
    }
    res.locals.rentals = rentals
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
