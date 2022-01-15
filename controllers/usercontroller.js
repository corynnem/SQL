const Router = require("express");
const { pool } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usercontroller = new Router();
const { User } = require('../tables/tables')

User()

usercontroller.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const resolved = () => {
    res.status(200).json({
      message: "user registered"
    });
  };
  const rejected = (message) => {
    res.status(401).json({
      message,
    });
  };

  try {
    pool.query("SELECT id FROM users", (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let lastRow = res.rows[res.rows.length - 1];
        register(lastRow !== undefined ? lastRow : { id: 0 });
      }
    });

    const register = (idObj) => {
      let id = (idObj.id += 1);
      const query = {
        text: "INSERT INTO users(id, firstName, lastName, email, password) VALUES($1, $2, $3, $4, $5)",
        values: [id, firstName, lastName, email, password]
      };

      pool.query(query, (err, res) => {
        if (err) {
          rejected(err.stack);
        } else {
          resolved();
        }
      });
    };


  } catch (err) {
    rejected(err);
  }
});

usercontroller.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const resolved = (token) => {
    res.status(200).json({
      message: "login success",
      token,
    });
  };
  const rejected = (err) => {
    res.status(401).json({
      message: "login failed",
    });
  };
  try {
    const query = {
      text: "SELECT id, email, password FROM users WHERE email=$1 ",
      values: [email],
    };

   pool.query(query, (err, res) => {
      if (bcrypt.compare(password, res.rows[0].password)) {
        const token = jwt.sign({ id: res.rows[0].id }, process.env.JWT_SECRET);
        resolved(token);
      } else {
        rejected(err);
      }
    });

  } catch (err) {
    rejected(err);
  }

 
});


module.exports = usercontroller;
