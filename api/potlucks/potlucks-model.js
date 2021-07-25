const db = require('../data/db-config')

const getPotlucks = async () => {
    const potlucks = await db('potlucks')
    return potlucks
}

const getById = async (id) => {
    const [potluck] = await db('potlucks')
    return potluck
}

const create = async (potluck) => {
    console.log('create wired')
}

const update = async (potluck) => {
    console.log('update wired')
}

const remove = async (potluck) => {
    console.log('remove wired')
}

module.exports = {
    getPotlucks,
    getById,
    create,
    update,
    remove
}