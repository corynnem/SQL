const { Pool } = require('pg')



// const connectionString = `postgresql://postgres:CmoodY98!59@localhost:5433/mydb`
// console.log(connectionString)

// Pooling allows for a reusable 'pool' of clients to be checked out, used and returned in less time
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

const pool = new Pool({connectionString})

module.exports = { pool }


// At the bottom is ssl configuration
// https://devcenter.heroku.com/articles/connecting-heroku-postgres

// db creds
// https://data.heroku.com/datastores/225366df-e15d-43b2-a802-9b62e8cd40b7#administration

// config vars
// https://dashboard.heroku.com/apps/book-db-sql/settings

