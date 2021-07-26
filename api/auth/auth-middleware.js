const Auth = require('./auth-model')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/secrets')

const checkPayload = (req, res, next) => {
    const { username, password } = req.body
    if(username && password) {
        next()
    } else {
        next({
            status: 422,
            message: 'Please provide username and password'
        })
    }
}

const checkUserNameExistsRegister = async (req, res, next) => {
    const { username } = req.body
    const exists = await Auth.findByUsername(username)
    if(exists) {
        next({
            status: 422,
            message: "Username taken"
        })
    } else {
        next()
    }
}

const checkUserNameExistsLogin = async (req, res, next) => {
    const { username } = req.body
    const user = await Auth.findByUsername(username)
    if(user) {
        req.user = user
        next()
    } else {
        next({
            status: 401,
            message: 'invalid credentials'
        })
    }
}

const restricted = async (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        return next({
            status: 401,
            message: 'token required'
        })
    }
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if(err) {
            return next({
                status: 401,
                message: 'token invalid'
            })
        }
        req.decodedJwt = decodedToken
        next()
    })
}

module.exports = {
    checkPayload,
    checkUserNameExistsRegister,
    checkUserNameExistsLogin,
    restricted
}
