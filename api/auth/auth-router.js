const bcrypt = require('bcryptjs')
const router = require('express').Router()
const tokenBuilder = require('./token-builder')
const Auth = require('./auth-model')


router.post('/register', async (req, res, next) => {
    const user = req.body
    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcrypt.hashSync(user.password, rounds)
    user.password = hash

    try{
       const newUser = await Auth.add(user)
       res.status(201).json({
           message: `Welcome, ${newUser.username}`
       })
    } catch(err) {
        next(err)
    }
   
})

router.post('/login', (req, res, next) => {
    console.log('login wired')
})

module.exports = router