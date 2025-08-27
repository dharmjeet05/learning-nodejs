const express = require('express')

const app = express()
const PORT = 8000

// In memory DB
const books = [
  { id: 1, title: 'Book One', author: 'Author One' },
  { id: 2, title: 'Book Two', author: 'Author Two' }
]

// middlewares
app.use(express.json())

// routes
app.get('/books', (req, res) => {
  res.json(books)
})
app.get('/books/:id', (req, res) => {
  const { id } = req.params

  if (isNaN(parseInt(id))) {
    return res.status(400).json({
      status: 400,
      message: 'Id must be of type number'
    })
  }

  const book = books.find((item) => item.id === parseInt(id))
  
  if (!book) {
    return res.status(404).json({
      status: 404,
      message: 'Book not found!',
      data: {}
    })
  } 

  return res.json({
    status: 200,
    message: 'Here is your Book!',
    data: book
  })
})
app.post('/books', (req, res) => {
  const { title, author } = req.body

  // Validations
  if (!title || title === '')
    return res.status(400).json({ status: '400', message: 'title is required' })
  if (!author || author === '')
    return res.status(400).json({ status: '400', message: 'author is required' })

  // add book to DB
  const myBook = { id: books.length + 1, title, author }
  books.push(myBook)

  // response
  res.status(201).json({
    status: 201,
    message: "Book added successfully!",
    data: myBook
  })
})
app.delete('/books/:id', (req, res) => {
  const { id } = req.params

  if (isNaN(parseInt(id))) {
    return res.status(400).json({
      status: 400,
      message: 'Id must be of type number'
    })
  }

  const indexToDelete = books.filter(item => item.id === parseInt(id))

  if (indexToDelete < 0) {
    return res.status(404).json({
      status: 404,
      message: 'Book not found!'
    })
  }

  books.splice(indexToDelete, 1)

  return res.status(200).json({
    status: 200,
    message: 'Book deleted'
  })
})

app.listen(PORT, () => {
  return console.log(`App is running on PORT: ${PORT}`)
})