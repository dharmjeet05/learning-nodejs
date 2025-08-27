const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.end('Homepage')
})

app.get('/contact-us', (req, res) => {
  res.end('You can contact me on my email address')
})

app.get('/tweets', (req, res) => {
  res.end('Here are your tweets')
})

app.post('/tweets', (req, res) => {
  res.status(201).end('Tweet created successfully!')
})

app.listen(8000, () => {
  return console.log(`Server is running on POST: 8000`)
})