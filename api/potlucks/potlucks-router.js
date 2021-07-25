const router = require('express').Router()
const Potlucks = require('./potlucks-model')

router.get('/', async (req, res, next) => {
    Potlucks.getPotlucks()
})

router.get('/:id', async (req, res, next) => {
    Potlucks.getById(1)
})

router.post('/', async (req, res, next) => {
    Potlucks.create()
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