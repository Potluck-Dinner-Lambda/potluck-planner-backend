const Potlucks = require('./potlucks-model')
const Guests = require('./guests-model')

const checkReqBody = async (req, res, next) => {
    if (!req.body.potluck_name) {
        res.status(422).json({
            message: "Potluck name required"
        })
    } else {
        next() 
    }
}

const checkPotluckNameExists = async (req, res, next) => {
    const { potluck_name } = req.body
    const exists = await Potlucks.findByPotluckName(potluck_name)
    if(exists) {
        res.status(422).json({
            message: 'Potluck name taken'
        })
    } else {
        next()
    }
}

const checkIfOrganizer = async (req, res, next) => {
    const user = await Guests.getInvited(req.params.id, req.decodedJwt.subject)
    if(user && user.is_organizer === true) {
        next()
    } else {
        res.status(401).json({message: 'only organizer has access'})
    }
}

module.exports = {
    checkReqBody,
    checkPotluckNameExists,
    checkIfOrganizer
}
