import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import http from 'http'
import Route from './src/server/routes'

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080
const server = http.createServer(app)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'faalse' }))

Route(app)
app.set(port)

server.listen(port, () => {
  const host = server.address().address

  console.log('Express server started  on http://%s:%s', host, port)
})
