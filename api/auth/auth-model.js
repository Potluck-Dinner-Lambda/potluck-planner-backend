const db = require('../data/db-config')

const add = async user => {
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
    return newUserObject
}

module.exports = {
    add
}