const { json } = require('express')
const dbConfig = require('../data/db-config')
const Potlucks = require('./potlucks-model')
const Guests = require('./guests-model')

const checkPotluckNameExists = async (req, res, next) => {
    const { potluck_name } = req.body
    const exists = await Potlucks.findByPotluckName(potluck_name)
    console.log(exists)
    if(exists && exists.length !== 0) {
        res.status(422).json({
            message: 'Potluck name taken'
        })
    } else {
        next()
    }
}

const checkIfOrganizer = async (req, res, next) => {
    console.log(req.params.id, req.decodedJwt.subject)
    const user = await Guests.getInvited(req.params.id, req.decodedJwt.subject)
    if(user && user.is_organizer === true) {
        next()
    } else {
        res.status(401).json({message: 'only organizer has access'})
    }
}

module.exports = {
    checkPotluckNameExists,
    checkIfOrganizer
}