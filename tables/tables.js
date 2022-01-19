const { pool } = require("../db");





const User = () => {
  pool.query(
    "CREATE TABLE IF NOT EXISTS users (id integer NOT NULL UNIQUE, firstName varchar(255), lastName varchar(255), email varchar(255) NOT NULL UNIQUE, password varchar(255), PRIMARY KEY(id));",
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("CREATE TABLE IF NOT EXISTS users");
      }
    }
  );
};

const Book = () => {

  pool.query(
    "CREATE TABLE IF NOT EXISTS books (id integer NOT NULL UNIQUE, name varchar(255), snippet varchar(1000), deweyDecimal varchar(255) NOT NULL UNIQUE, review varchar(255), userid integer);",
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("CREATE TABLE IF NOT EXISTS books");
      }
    }
  );
};



pool.query

// const queries = ['DROP TABLE users', 'DROP TABLE books']
// pool.query(queries[1])

module.exports = {
  User,
  Book,
};
