const db = require('../data/db-config')

const addItem = async (potluckId, item) => {
    const newItem = await db('items')
        .returning(['item_id', 'item_name'])
        .insert({item_name: item.item_name, potluck_id: potluckId})
    return newItem
}

const editItem = async (itemId, changes, userId) => {
    if(changes.select_item && changes.select_item === true && changes.item_name) {
        return await db('items')
            .returning(['item_id', 'item_name', 'user_id'])
            .update({user_id: userId, item_name: changes.item_name})
            .where('item_id', itemId)
    } else if(changes.select_item && changes.select_item === true && !changes.item_name){
        return await db('items')
            .returning(['item_id', 'item_name', 'user_id'])
            .update({user_id: userId}).where('item_id', itemId)
    } else{
        return await db('items')
            .returning(['item_id', 'item_name', 'user_id'])
            .update({item_name: changes.item_name})
            .where('item_id', itemId)
    }
}

module.exports = {
    addItem,
    editItem
}
