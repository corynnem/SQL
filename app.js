require("dotenv").config();
const Express = require("express");
const app = Express();
const cors = require('./middlewares/cors')
const { users, books } = require('./controllers');


app.use(Express.json())
app.use(cors)

app.use('/user', users)
app.use('/books', books)

app.use("/static", Express.static("node_modules"));


app.listen(process.env.PORT, () => {  
    console.log(`app listening on ${process.env.PORT}`)

});