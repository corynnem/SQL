const { Pool } = require('pg')
const config = {
  connectionString: `postgres://postgres:${process.env.PASS}@localhost:5432/mydb`,
  ssl:{
    rejectUnauthorized: false,
    ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
    key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
    cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
  }
}

// Pooling allows for a reusable 'pool' of clients to be checked out, used and returned in less time
const pool = new Pool(config)

module.exports = { pool }