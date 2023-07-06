// STRETCH
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('cars').truncate()
    await knex('cars').insert([
      { vin: "2FAGP9CW5JH100127", 
        make: "Ford", 
        model: "GT", 
        mileage: 960, 
        title: 'n/a', 
        transmission: "automatic"},
    ]);
  };
  