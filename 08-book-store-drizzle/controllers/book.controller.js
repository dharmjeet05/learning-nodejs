const { eq, sql } = require("drizzle-orm")
const booksTable = require("../models/book.model")
const authorsTable = require("../models/author.model")
const db = require("../db")

exports.getAllBooks = async function(req, res) {
  const search = req.query.search

  if (search) {
    const books = await db.select().from(booksTable).where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`)
    return res.json({
      status: 200,
      data: books,
      message: 'Here is your books'
    })
  }

  const books = await db.select().from(booksTable)
  return res.json({
    status: 200,
    data: books,
    message: 'Here is your books'
  })
}

exports.getBookByID = async function(req, res) {
  const { id } = req.params

  const [book] =
    await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, id))
      .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
      .limit(1)

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

exports.createBook = async function(req, res) {
  const { title, description, authorId } = req.body

  // Validations
  if (!title || title === '')
    return res.status(400).json({ status: '400', message: 'title is required' })
  if (!authorId || authorId === '')
    return res.status(400).json({ status: '400', message: 'author is required' })

  // add book to DB
  const [createdUser] = await db.insert(booksTable).values({
    title, description, authorId
  }).returning({ id: booksTable.id })

  // response
  res.status(201).json({
    status: 201,
    message: "Book added successfully!",
    data: { id: createdUser }
  })
}

exports.deleteBook = async function(req, res) {
  const { id } = req.params

  const [deletedRecord] = await db.delete(booksTable).where(eq(booksTable.id, id)).returning({ id: booksTable.id })

  return res.status(200).json({
    status: 200,
    message: 'Book deleted',
    data: deletedRecord
  })
}