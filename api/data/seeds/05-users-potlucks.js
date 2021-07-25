
exports.seed = function(knex) {
      return knex('users_potlucks').insert([
        {user_id: 1, potluck_id: 1, is_organizer: true },
        {user_id: 2, potluck_id: 2, is_organizer: true },
        {user_id: 3, potluck_id: 1, is_organizer: false, is_going: true},
        {user_id: 3, potluck_id: 2, is_organizer: false, is_going: false},
      ]);
};
