const { Client, Pool } = require('pg')
const { parseSsl } = require('pg-ssl')

let pool = new Pool({
  user: "postgres",
  password: process.env.PASS,
  database: "mydb",
  port: 5432,
  host: "localhost",
  ssl: true
});
// client.connect(function () {
//   console.log("connected");
// });

// Pooling allows for a reusable 'pool' of clients to be checked out, used and returned in less time
const client = new Pool(pool)

module.exports = { client }