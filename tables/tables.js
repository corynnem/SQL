const { pool } = require("../db");

const User = () => {
  pool.query(
    "CREATE TABLE IF NOT EXISTS users (id integer, firstName varchar(255), lastName varchar(255), email varchar(255), password varchar(255), PRIMARY KEY(id));",
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
    "CREATE TABLE IF NOT EXISTS books (id integer, name varchar(255), snippet varchar(1000), deweyDecimal varchar(255) NOT NULL UNIQUE, review varchar(255), userId integer, FOREIGN KEY (userId) REFERENCES users(id));",
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("CREATE TABLE IF NOT EXISTS books");
      }
    }
  );
};

module.exports = {
  User,
  Book,
};
