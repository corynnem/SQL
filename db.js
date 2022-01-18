const { Pool } = require('pg')
let parse = require('pg-connection-string').parse;


const connectionString = parse(`postgresql://postgres:${process.env.PASS}@localhost:5432/mydb`)

// Pooling allows for a reusable 'pool' of clients to be checked out, used and returned in less time
const pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}})


module.exports = { pool }


// At the bottom is ssl configuration
// https://devcenter.heroku.com/articles/connecting-heroku-postgres

// db creds
// https://data.heroku.com/datastores/225366df-e15d-43b2-a802-9b62e8cd40b7#administration

// config vars
// https://dashboard.heroku.com/apps/book-db-sql/settings

