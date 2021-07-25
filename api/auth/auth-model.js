const db = require('../data/db-config')

const add = async user => {
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
    return newUserObject
}

const findByUsername = async username => {
    const [user] = await db('users').where('username', username)
    return user
}

module.exports = {
    add,
    findByUsername
}