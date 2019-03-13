const express = require('express')
const intraEdgeSession = require('./intraedge-session')

const app = express()

app.use(express.json())
app.use(intraEdgeSession)
app.use((req, res, next) => {
  if (!req.session.counter) {
    req.session.counter = 1
  } else {
    req.session.counter++
  }
  next()
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('Session destroyed')
})

app.get('/', (req, res) => {
  res.send('You have visited ' + req.session.counter + ' times. Your session ID is ' + req.session.id)
})

const port = 3005
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
