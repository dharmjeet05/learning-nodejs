const express = require('express')

const { loggerMiddleware } = require('./middlewares/logger')
const bookRouter = require('./routes/book.routes')

const app = express()
const PORT = 8000

// middlewares
app.use(express.json())
app.use(loggerMiddleware)

// routes
app.use('/books', bookRouter)

app.listen(PORT, () => {
  return console.log(`App is running on PORT: ${PORT}`)
})