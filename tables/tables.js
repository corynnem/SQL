const { client } = require("../db");

const User = () => {
  client.query(
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

  client.query(
    "CREATE TABLE IF NOT EXISTS books (id integer NOT NULL UNIQUE, name varchar(255), snippet varchar(1000), deweyDecimal varchar(255) NOT NULL UNIQUE, review varchar(255), userId integer, FOREIGN KEY (userId) REFERENCES users(id));",
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("CREATE TABLE IF NOT EXISTS books");
      }
    }
  );
};


// const queries = ['DROP TABLE users', 'DROP TABLE books']
// client.query(queries[1])

module.exports = {
  User,
  Book,
};
