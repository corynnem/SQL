const Router = require("express");
const { pool } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usercontroller = new Router();
const { User } = require('../tables/tables')


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of a new User
 *         firstName:
 *           type: string
 *           description: The User's first name
 *         lastName:
 *           type: string
 *           description: The User's last name
 *         email:
 *           type: string
 *           description: The User's email
 *         password:
 *           type: string
 *           description: The User's chosen password
 *       example:
 *         id: 1
 *         email: email@gmail.com
 *         firstName: Jane
 *         lastName: Doe
 *         password: password123
 */

User()



/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a user and returns a message of "register success" 
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: "user registered"
 *       401:
 *         description: error message specified by pg
 */

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



/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user and returns a message of "login success" 
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: "login success"
 *       401:
 *         description: 'login failed'
 */

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
