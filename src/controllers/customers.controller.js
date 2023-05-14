import { db } from '../database/database.js'

export async function getCustomers(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM customers;')
    res.status(200).send(rows)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function createCustomers(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer

  try {
    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday)
       VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    )
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function getCustomerId(req, res) {
  const customer = res.locals.customer
  try {
    res.send(customer[0])
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer
  const id = req.params.id
  // const { rows } = await db.query(`SELECT * FROM customers WHERE id = $1;`, [
  //   id
  // ])
  try {
    await db.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`,
      [name, phone, cpf, birthday, id]
    )
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
}
