const db = require('../data/db-config')

const addItem = async (potluckId, item) => {
    const newItem = await db('items').returning(['item_id', 'item_name']).insert({item_name: item.item_name, potluck_id: potluckId})
    return newItem
}

module.exports = {
    addItem
}