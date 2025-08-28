const express = require("express")
const controller = require("../controllers/author.controller")

const router = express.Router()

router.get('/', controller.getAllAuthors)

router.get('/:id', controller.getAuthorById)

router.get('/:id/books', controller.getBooksByAuthorId)

module.exports = router