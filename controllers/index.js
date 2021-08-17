const users = require('./usercontroller')
const books = require('./bookcontroller')

module.exports = app => {
  app.use('/users', users),
  app.use('/books', books)
}