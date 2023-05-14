import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Pool } = pg

const configDatabase = new Pool({
  connectionString: process.env.DATABASE_URL
})

export const db = new Pool(configDatabase)
