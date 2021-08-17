require("dotenv").config();
const Express = require("express");
const app = Express();
const mountRoutes = require('./controllers')
const cors = require('./middlewares/cors')


app.use(Express.json())


app.use(cors)
mountRoutes(app)

app.listen(8080, () => {  
    console.log(`app listening on ${8080}`)
})