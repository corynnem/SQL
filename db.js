const { Pool } = require('pg')
const fs = require('fs')
const config = {
  connectionString: `postgres://postgres:${process.env.PASS}@localhost:5432/mydb?sslmode=require`,
  dialect: 'postgres',
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
  },
}

// Pooling allows for a reusable 'pool' of clients to be checked out, used and returned in less time
const pool = new Pool(config)

module.exports = { pool }