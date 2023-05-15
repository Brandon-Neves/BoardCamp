import dayjs from 'dayjs'
import { db } from '../database/database.js'

export async function createRentals(req, res) {
  const { gameId, customerId, daysRented, newPrice } = res.locals.rentals

  try {
    await db.query(
      `INSERT INTO rentals (
        "customerId",
        "gameId",
        "rentDate", 
        "daysRented", 
        "returnDate", 
        "originalPrice", 
        "delayFee"
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        customerId,
        gameId,
        dayjs().format('YYYY-MM-DD'),
        daysRented,
        null,
        newPrice,
        null
      ]
    )
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(500)
  }
}
