const { eq, sql } = require("drizzle-orm")
const db = require("../db")
const authorsTable = require("../models/author.model")
const booksTable = require("../models/book.model")

exports.getAllAuthors = async function(req, res) {
  const authors = await db.select().from(authorsTable)
  return res.json({
    status: 200,
    data: authors,
    message: 'Here is your authors'
  })
}

exports.getAuthorById = async function(req, res) {
  const { id } = req.params

  const [author] = await db.select().from(authorsTable).where(eq(authorsTable.id, id)).limit(1)

  if (!author) {
    return res.status(404).json({
      status: 404,
      message: 'Author not found!',
      data: {}
    })
  } 

  return res.json({
    status: 200,
    message: 'Here is your Author!',
    data: author
  })
}

exports.getBooksByAuthorId = async function(req, res) {
  const books = await db.select().from(booksTable).where(eq(booksTable.authorId, req.params.id))

  return res.json({
    status: 200,
    data: books,
    message: 'Here is your Books'
  })
}