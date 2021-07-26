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
            'i.user_id as itemUserId',
            'up.is_organizer',
            'up.is_going',
            'u.user_id',
            'u.username')
        .from('potlucks as p')
        .leftJoin('items as i', 'i.potluck_id', 'p.potluck_id')
        .leftJoin('users_potlucks as up', 'up.potluck_id', 'p.potluck_id')
        .join('users as u', 'u.user_id', 'up.user_id')
    
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

    const items = unformattedPotlucks.map(item => {
        return {
            "item_id": item.item_id,
            "item_name": item.item_name,
            "user_id": item.itemUserId,
            "potluck_id": item.potluck_id
        }
    })

    const guests = unformattedPotlucks.map(item => {
        return {
            "username": item.username,
            "potluck_id": item.potluck_id,
            "is_going": item.is_going,
            "is_organizer": item.is_organizer
        }
    })

    const formattedWithItemsAndGuests = filteredPotluckInfo.map(potluck => {
        const potluckId = potluck.potluck_id

        const unFilteredItems = items.filter(item => {
            return item.potluck_id === potluckId
        })

        const filteredItems = unFilteredItems.filter((item, index, self) => {
            return index === self.findIndex((t) => (
                t.item_id === item.item_id
            ))
        })

        const unFilteredGuests = guests.filter(guest => {
            return guest.potluck_id === potluckId
        })

        const filteredGuests = unFilteredGuests.filter((guest, index, self) => {
            return index === self.findIndex((t) => {
               return t.username === guest.username && t.potluck_id === guest.potluck_id
            })
        })

        return {
            ...potluck,
            "items": filteredItems,
            "guests": filteredGuests
        }
    })
    return formattedWithItemsAndGuests
}

const getById = async (id) => {
    const unformattedPotlucks = await db
    .select(
        'p.potluck_id', 
        'p.potluck_name', 
        'p.potluck_date', 
        'p.potluck_time', 
        'p.potluck_location',
        'i.item_id',
        'i.item_name',
        'i.user_id as itemUserId',
        'up.is_organizer',
        'up.is_going',
        'u.user_id',
        'u.username')
    .from('potlucks as p')
    .where('p.potluck_id', id)
    .leftJoin('items as i', 'i.potluck_id', 'p.potluck_id')
    .leftJoin('users_potlucks as up', 'up.potluck_id', 'p.potluck_id')
    .join('users as u', 'u.user_id', 'up.user_id')

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

    const items = unformattedPotlucks.map(item => {
        return {
            "item_id": item.item_id,
            "item_name": item.item_name,
            "user_id": item.itemUserId,
            "potluck_id": item.potluck_id
        }
    })

    const guests = unformattedPotlucks.map(item => {
        return {
            "username": item.username,
            "potluck_id": item.potluck_id,
            "is_going": item.is_going,
            "is_organizer": item.is_organizer
        }
    })

    const [formattedWithItemsAndGuests] = filteredPotluckInfo.map(potluck => {
        const potluckId = potluck.potluck_id

        const unFilteredItems = items.filter(item => {
            return item.potluck_id === potluckId
        })

        const filteredItems = unFilteredItems.filter((item, index, self) => {
            return index === self.findIndex((t) => (
                t.item_id === item.item_id
            ))
        })

        const unFilteredGuests = guests.filter(guest => {
            return guest.potluck_id === potluckId
        })

        const filteredGuests = unFilteredGuests.filter((guest, index, self) => {
            return index === self.findIndex((t) => {
               return t.username === guest.username && t.potluck_id === guest.potluck_id
            })
        })

        return {
            ...potluck,
            "items": filteredItems,
            "guests": filteredGuests
        }
    })
    return formattedWithItemsAndGuests
}

const create = async (potluck, token) => {
    const [id] = await db('potlucks').insert(potluck, ['potluck_id'])

    const unformattedPotlucks = await db
    .select(
        'p.potluck_id', 
        'p.potluck_name', 
        'p.potluck_date', 
        'p.potluck_time', 
        'p.potluck_location')
    .from('potlucks as p')
    .where('p.potluck_id', id.potluck_id)

    const formatted = unformattedPotlucks.map(item => {
        return {
            'potluck_id': item.potluck_id,
            'potluck_name': item.potluck_name,
            'potluck_date': item.potluck_date,
            'potluck_time': item.potluck_time,
            'potluck_location': item.potluck_location
        }
    })

    const [filteredPotluckInfo] = formatted.filter((potluck, index, self) => {
        return index === self.findIndex((t) => (
            t.potluck_id === potluck.potluck_id
        ))
    })

    await db('users_potlucks').insert({
        user_id: token.subject,
        potluck_id: filteredPotluckInfo.potluck_id,
        is_organizer: true,
        is_going: true
     })

     console.log(filteredPotluckInfo.potluck_id)

    return filteredPotluckInfo
}

const findByPotluckName = async(potluckName) => {
    return db('potlucks').where('potluck_name', potluckName)
}

const update = async (id, potluck) => {
    const [updatedId] = await db('potlucks').where('potluck_id', id).update(potluck, '*')
    
    return await getById(updatedId.potluck_id)
}

const remove = async (id) => {
    const count = await db('potlucks').where('potluck_id', id).del()
    return count      
    }

const getPotluckGeneralInfo = async (id) => {
    const unformattedPotlucks = await db
    .select(
        'p.potluck_id', 
        'p.potluck_name', 
        'p.potluck_date', 
        'p.potluck_time', 
        'p.potluck_location')
    .from('potlucks as p')
    .where('p.potluck_id', id)

    const formatted = unformattedPotlucks.map(item => {
        return {
            'potluck_id': item.potluck_id,
            'potluck_name': item.potluck_name,
            'potluck_date': item.potluck_date,
            'potluck_time': item.potluck_time,
            'potluck_location': item.potluck_location
        }
    })

    const [filteredPotluckInfo] = formatted.filter((potluck, index, self) => {
        return index === self.findIndex((t) => (
            t.potluck_id === potluck.potluck_id
        ))
    })
    
    return filteredPotluckInfo
}

module.exports = {
    getPotlucks,
    getById,
    create,
    update,
    remove,
    findByPotluckName,
    getPotluckGeneralInfo
}