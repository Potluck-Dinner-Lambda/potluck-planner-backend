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

const getInvited = async (potluckId, userId) => {
    const [user] = await db('users_potlucks').where({
        'user_id': userId, 
        'potluck_id': potluckId
    })
    return user
}

const rsvp = async (potluckId, userId) => {
    await db('users_potlucks').update({is_going: true}).where({
        'user_id': userId, 
        'potluck_id': potluckId
    })
}

module.exports = {
    addGuest,
    getByUsername,
    rsvp,
    getInvited
}