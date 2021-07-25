const { json } = require('express')
const Potlucks = require('./potlucks-model')

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

module.exports = {
    checkPotluckNameExists
}