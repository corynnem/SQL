const { Pool } = require('pg')
const config = {
  connectionString: `postgres://postgres:${process.env.PASS}@localhost:5432/mydb?sslmode=require`,
  ssl: process.env.ENVIRONMENT === 'production'
}

// Pooling allows for a reusable 'pool' of clients to be checked out, used and returned in less time
const pool = new Pool(config)

module.exports = { pool }