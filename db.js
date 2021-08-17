const { Pool } = require('pg')
const connectionString = 'postgres://postgres:CmoodY98!59@localhost:5432/mydb'

// Pooling allows for a reusable 'pool' of clients to be checked out, used and returned in less time
const pool = new Pool({
  connectionString,
})

module.exports = { pool }