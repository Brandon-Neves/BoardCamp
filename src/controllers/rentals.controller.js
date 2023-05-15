import dayjs from 'dayjs'
import { db } from '../database/database.js'

export async function getRentals(req, res) {
  try {
    const { rows } = await db.query(`
    SELECT rentals.*, 
    customers.id AS "idCustomer", 
    customers.name AS "idCustomerName", 
    games.id AS "idGame", 
    games.name AS "gameName" FROM rentals 
    JOIN customers ON "customerId" = customers.id 
    JOIN games ON "gameId" = games.id
    `)

    const rentals = rows.map(row => ({
      id: row.id,
      customerId: row.customerId,
      gameId: row.gameId,
      rentDate: dayjs(row.rentDate).format('YYYY-MM-DD'),
      daysRented: row.daysRented,
      returnDate: row.returnDate,
      originalPrice: row.originalPrice,
      delayFee: row.delayFee,
      customer: {
        id: row.idCustomer,
        name: row.idCustomerName
      },
      game: {
        id: row.gameId,
        name: row.gameName
      }
    }))
    res.send(rentals)
  } catch (err) {
    res.sendStatus(500)
  }
}

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

export async function finalizeRentals(req, res) {
  const { returnDate, delayFee, id } = res.locals.rentals
  console.log(res.locals.rentals)
  try {
    await db.query(
      `UPDATE rentals SET "returnDate" = $1, 
      "delayFee" = $2 WHERE id = $3`,
      [returnDate, delayFee, id]
    )
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function deleteRentals(req, res) {
  const id = req.params.id

  try {
    await db.query(`DELETE FROM rentals WHERE id = $1`, [id])
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
}
