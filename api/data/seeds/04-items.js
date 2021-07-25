
exports.seed = function(knex) {
      return knex('items').insert([
        {item_name: 'drinks', potluck_id: 1 },
        {item_name: 'dessert', potluck_id: 1 },
        {item_name: 'appetizer', potluck_id: 2 },
        {item_name: 'side dish', user_id: 1, potluck_id: 1 },
        {item_name: 'salad', user_id:2, potluck_id: 2 },
        {item_name: 'bread', potluck_id: 2 }
      ]);
};
