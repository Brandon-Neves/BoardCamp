import dayjs from 'dayjs'
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
    const checkGameStock = await db.query(
      `SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL`,
      [gameId]
    )

    const gameStock = checkGameStock.rowCount

    if (customerIsExist.rows.length === 0) {
      return res.sendStatus(400)
    }
    if (rows.length === 0) {
      return res.sendStatus(400)
    }
    if (rows[0].stockTotal <= gameStock) {
      return res.sendStatus(400)
    }
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

export async function validationRentalsId(req, res, next) {
  const id = req.params.id

  try {
    const rentalsIdExist = await db.query(
      `SELECT * FROM rentals WHERE id = $1`,
      [id]
    )
    const { rows } = rentalsIdExist
    const newRental = rows[0]
    console.log(rows[0])
    if (rentalsIdExist.rowCount === 0) return res.sendStatus(404)
    if (rows[0].returnDate != null) return res.sendStatus(400)

    const returnDate = dayjs().format('YYYY-MM-DD')
    const dateExpireAt = dayjs(newRental.rentDate, 'day').add(
      newRental.daysRented,
      'day'
    )

    const diffDays = dayjs().diff(dateExpireAt, 'day')

    let delayFee

    if (diffDays > 0) {
      delayFee = diffDays * (newRental.originalPrice / newRental.daysRented)
    }

    res.locals.rentals = { returnDate, delayFee, id }
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
