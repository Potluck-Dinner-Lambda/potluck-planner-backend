const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')
const authRouter = require('./auth/auth-router')
const potlucksRouter = require('./potlucks/potlucks-router')

function getAllUsers() { return db('users') }

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
  return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/potlucks', potlucksRouter)

server.use((req, res, next) => {
  res.status(400).json({
    message: "sorry, not found"
  })
})

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

server.get('/api/users', async (req, res) => {
  res.json(await getAllUsers())
})

server.post('/api/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body))
})

module.exports = server
