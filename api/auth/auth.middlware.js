const Auth = require('./auth-model')

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

module.exports = {
    checkPayload,
    checkUserNameExistsRegister,
    checkUserNameExistsLogin
}