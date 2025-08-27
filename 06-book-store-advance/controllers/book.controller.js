const { BOOKS } = require("../models/books")

exports.getAllBooks = function(req, res) {
  res.json(BOOKS)
}

exports.getBookByID = function(req, res) {
  const { id } = req.params

  if (isNaN(parseInt(id))) {
    return res.status(400).json({
      status: 400,
      message: 'Id must be of type number'
    })
  }

  const book = BOOKS.find((item) => item.id === parseInt(id))
  
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
}

exports.createBook = function(req, res) {
  const { title, author } = req.body

  // Validations
  if (!title || title === '')
    return res.status(400).json({ status: '400', message: 'title is required' })
  if (!author || author === '')
    return res.status(400).json({ status: '400', message: 'author is required' })

  // add book to DB
  const myBook = { id: BOOKS.length + 1, title, author }
  BOOKS.push(myBook)

  // response
  res.status(201).json({
    status: 201,
    message: "Book added successfully!",
    data: myBook
  })
}

exports.deleteBook = function(req, res) {
  const { id } = req.params

  if (isNaN(parseInt(id))) {
    return res.status(400).json({
      status: 400,
      message: 'Id must be of type number'
    })
  }

  const indexToDelete = BOOKS.filter(item => item.id === parseInt(id))

  if (indexToDelete < 0) {
    return res.status(404).json({
      status: 404,
      message: 'Book not found!'
    })
  }

  BOOKS.splice(indexToDelete, 1)

  return res.status(200).json({
    status: 200,
    message: 'Book deleted'
  })
}