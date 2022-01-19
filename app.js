require("dotenv").config();
const Express = require("express");
const app = Express();
const cors = require("./middlewares/cors");
const { users, books } = require("./controllers");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(Express.json());
app.use(cors);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Keeping API",
      description:
        "API is designed for users to keep track of their books",
      contact: {
        name: "Corynne Moody",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
      {
        url: "https://book-db-sql.herokuapp.com/",
      },
    ],
  },
  apis: ["*.js", "./controllers/*.js", "./models/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    // explorer: true
  })
);




/**
 * @swagger
 * components:
 *   securitySchemes:
 *      UserAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       in: header
 */

app.use("/users", users);
app.use("/books", books);

app.use("/static", Express.static("node_modules"));

app.listen(process.env.PORT, () => {
  console.log(`app listening on ${process.env.PORT}`);
});
