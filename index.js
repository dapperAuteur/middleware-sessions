const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())

app.get('/data', (req, res) => {
  res.json({
    data: [1, 3, 3, 7],
  })
})

app.get('/data2', (req, res) => {
  res.json({
    data: [1, 3, 3, 8],
  })
})

const port = 3005
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
