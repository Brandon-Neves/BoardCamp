import { db } from '../database/database.js'

export async function validationCustomer(req, res, next) {
  const customer = req.body
  const { cpf } = req.body

  try {
    const customerExists = await db.query(
      `SELECT * FROM customers WHERE cpf = $1;`,
      [cpf]
    )
    if (customerExists.rowCount !== 0) {
      return res.sendStatus(409)
    }
    res.locals.customer = customer
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function validationCustomerId(req, res, next) {
  const id = req.params.id

  try {
    const { rows } = await db.query(
      `SELECT *, to_char(birthday, 'YYYY-MM-DD') AS birthday FROM customers WHERE id = $1;`,
      [id]
    )
    if (!rows || rows.length === 0) return res.sendStatus(404)
    res.locals.customer = rows
    next()
  } catch (err) {
    res.sendStatus(401)
  }
}

export async function validationUpdateCustomer(req, res, next) {
  const customer = req.body
  const { cpf } = req.body
  const id = req.params.id

  try {
    const cpfExists = await db.query(
      `SELECT * FROM customers WHERE cpf = $1 AND id != $2;`,
      [cpf, id]
    )
    if (cpfExists.rowCount !== 0) {
      return res.sendStatus(409)
    }
    res.locals.customer = customer
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
