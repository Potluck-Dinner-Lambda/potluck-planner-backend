const router = require('express').Router()
const Potlucks = require('./potlucks-model')
const { checkPotluckNameExists } = require('./potlucks-middleware')

router.get('/', async (req, res, next) => {
    try{
        const potlucks = await Potlucks.getPotlucks()
        res.status(200).json(potlucks)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        const potluck = await Potlucks.getById(id)
        res.status(200).json(potluck)
    } catch(err) {
        next(err)
    }
})

router.post('/', checkPotluckNameExists, async (req, res, next) => {
    try {
        const newPotluck = await Potlucks.create(req.body)
        res.status(201).json(newPotluck)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    Potlucks.update(1)
})

router.delete('/:id', async (req, res, next) => {
    Potlucks.remove(1)
})

router.post('/:id/items', async (req, res, next) => {

})

router.put('/items/:itemId', async (req, res, next) => {

})

router.post('/:id/guests', async (req, res, next) => {

})

router.put('/:id/guests', async (req, res, next) => {

})

module.exports = router