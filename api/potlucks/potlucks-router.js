const router = require('express').Router()
const Potlucks = require('./potlucks-model')
const { checkPotluckNameExists, checkIfOrganizer } = require('./potlucks-middleware')
const Items = require('./items-model')
const Guests = require('./guests-model')
const { restricted } = require('../auth/auth-middleware')
const { checkIfUserExists, checkIfUserInvited } = require('./guests-middleware')

router.get('/', restricted, async (req, res, next) => {
    try{
        const potlucks = await Potlucks.getPotlucks()
        res.status(200).json(potlucks)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', restricted, async (req, res, next) => {
    try{
        const { id } = req.params
        const potluck = await Potlucks.getById(id)
        res.status(200).json(potluck)
    } catch(err) {
        next(err)
    }
})

router.post('/', checkPotluckNameExists, restricted, async (req, res, next) => {
    try {
        const newPotluck = await Potlucks.create(req.body, req.decodedJwt)
        res.status(201).json(newPotluck)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', restricted, checkIfOrganizer, async (req, res, next) => {
    const { id } = req.params
    const changes = req.body
    try {
        const updatedPotluck = await Potlucks.update(id, changes)
        res.status(200).json(updatedPotluck)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', restricted, async (req, res, next) => {
    try{
        const { id } = req.params
        const potluckToDelete = await Potlucks.getPotluckGeneralInfo(id)
        console.log(potluckToDelete)
        const count = await Potlucks.remove(id)
        if(count > 0) {
            res.status(200).json(potluckToDelete)
        } else {
            res.status(500).json({
                message: 'potluck could not be found'
            })
        }
    } catch(err) {
        next(err)
    }
})

router.post('/:id/items', restricted, async (req, res, next) => {
    const { id } = req.params
    const item = req.body
    try{
        const newItem = await Items.addItem(id, item)
        res.status(201).json(newItem)
    } catch(err) {
        next(err)
    }
})

router.put('/items/:itemId', restricted, async (req, res, next) => {
    const itemId = req.params.itemId
    const changes = req.body
    const userId = req.decodedJwt.subject
    console.log(req.decodedJwt.subject)
    try{
        const updatedItem = await Items.editItem(itemId, changes, userId)
        res.status(201).json(updatedItem)
    } catch(err) {
        next(err)
    }
})

router.post('/:id/guests', restricted, checkIfUserExists, async (req, res, next) => {
    try{
        const { id } = req.params
        const added = await Guests.addGuest(id, req.userId)
        res.status(200).json({message: 'guest added'})
    } catch(err) {
        next(err)
    }
})

router.put('/:id/guests', restricted, checkIfUserExists, checkIfUserInvited, async (req, res, next) => {
    try{
        const { id } = req.params
        const user = await Guests.rsvp(id, req.userId)
        res.status(200).json({message: 'successfully rsvp-ed'})
    } catch(err) {
        next(err)
    }
})

module.exports = router