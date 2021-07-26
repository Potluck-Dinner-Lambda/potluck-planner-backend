const Guests = require('./guests-model')

const checkIfUserExists = async (req, res, next) => {
    try{
        console.log(req.decodedJwt.user_id)
        const user = await Guests.getByUserId(req.decodedJwt.subject)
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

const checkIfUserInvited = async (req, res, next) => {
    try{
        const invited = await Guests.getInvited(req.params.id, req.userId)
        if(invited) {
            next()
        }
        else {
            next({
                status: 404,
                message: 'user not invited'
            })
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
    checkIfUserExists,
    checkIfUserInvited
}