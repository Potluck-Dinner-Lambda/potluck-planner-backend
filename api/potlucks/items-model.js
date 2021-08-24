const db = require('../data/db-config')

const addItem = async (potluckId, item) => {
    const [newItem] = await db('items')
        .returning(['item_id', 'item_name'])
        .insert({item_name: item.item_name, potluck_id: potluckId})
    return newItem
}

const editItem = async (itemId, changes, userId) => {
    if(changes.select_item && changes.select_item === true && changes.item_name) {
        const [updatedItem] = await db('items')
            .returning(['item_id', 'item_name', 'user_id'])
            .update({user_id: userId, item_name: changes.item_name})
            .where('item_id', itemId)
        return updatedItem
    } else if(changes.select_item && changes.select_item === true && !changes.item_name){
        const [updatedItem] = await db('items')
            .returning(['item_id', 'item_name', 'user_id'])
            .update({user_id: userId}).where('item_id', itemId)
        return updatedItem
    } else{
        const [updatedItem] = await db('items')
            .returning(['item_id', 'item_name', 'user_id'])
            .update({item_name: changes.item_name})
            .where('item_id', itemId)
        return updatedItem
    }
}

const deleteItem = async (itemId) => {
    const count = await db('items').where('item_id', itemId).del()
    return count
}

module.exports = {
    addItem,
    editItem,
    deleteItem
}
