
exports.seed = function(knex) {
      return knex('potlucks').insert([
        {potluck_name: "Sandy's Potluck", potluck_date: '06/25/21', potluck_time: '8:00:00', potluck_location: 'New York City'},
        {potluck_name: "Afie's Potluck", potluck_date: '06/25/21', potluck_time: '10:00:00', potluck_location: 'Austin'}
      ]);
};
