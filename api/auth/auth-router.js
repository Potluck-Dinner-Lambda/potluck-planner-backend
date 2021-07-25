const bcrypt = require('bcryptjs')
const router = require('express').Router()
const tokenBuilder = require('./token-builder')

router.post('/register', (req, res, next) => {
    console.log('register wired')
})

router.post('/login', (req, res, next) => {
    console.log('login wired')
})

module.exports = router