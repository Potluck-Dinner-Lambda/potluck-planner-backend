const db = require('../data/db-config')

const getPotlucks = async () => {
    const unformattedPotlucks = await db
        .select(
            'p.potluck_id', 
            'p.potluck_name', 
            'p.potluck_date', 
            'p.potluck_time', 
            'p.potluck_location',
            'i.item_id',
            'i.item_name',
            'up.is_organizer',
            'up.is_going',
            'u.user_id',
            'u.username')
        .from('potlucks as p')
        .leftJoin('items as i', 'i.potluck_id', 'p.potluck_id')
        .leftJoin('users_potlucks as up', 'up.potluck_id', 'p.potluck_id')
        .join('users as u', 'u.user_id', 'up.user_id')
    // console.log(potlucks)
    
    const formatted = unformattedPotlucks.map(item => {
        return {
            'potluck_id': item.potluck_id,
            'potluck_name': item.potluck_name,
            'potluck_date': item.potluck_date,
            'potluck_time': item.potluck_time,
            'potluck_location': item.potluck_location
        }
    })

    const filteredPotluckInfo = formatted.filter((potluck, index, self) => {
        return index === self.findIndex((t) => (
            t.potluck_id === potluck.potluck_id
        ))
    })

    console.log(filteredPotluckInfo)

    const items = unformattedPotlucks.map(item => {
        return {
            "item_id": item.item_id,
            "item_name": item.item_name,
            "username": item.username,
            "potluck_id": item.potluck_id
        }
    })

    const guests = unformattedPotlucks.map(item => {
        return {
            "username": item.username,
            "potluck_id": item.potluck_id
        }
    })

    // console.log(formatted)

    return potlucks
}

const getById = async (id) => {
    const [potluck] = await db('potlucks').where('potluck_id', id)
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