const db = require('../data/db-config')

const addGuest = async (potluckId, userId) => {
    await db('users_potlucks').insert({
        user_id: userId,
        potluck_id: potluckId
    })
}

const getByUsername = async (username) => {
    const [user] = await db('users').where('username', username)
    return user
}

module.exports = {
    addGuest,
    getByUsername
}