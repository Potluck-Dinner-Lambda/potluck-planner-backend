const Guests = require('./guests-model')

const checkIfUserExists = async (req, res, next) => {
    console.log(req.body.username)
    try{
        const user = await Guests.getByUsername(req.body.username)
        console.log(user)
        if(user){
            req.userId = user.user_id
            next()
        } else {
            next({
                status: 404,
                message: 'user not found'
            })
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
    checkIfUserExists
}