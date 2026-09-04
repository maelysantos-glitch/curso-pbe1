exports.up = function(knex) {
  return knex.schema.createTable('veiculos', table => {
    table.increments('id').primary();
    table.string('marca').notNullable();
    table.string('modelo').notNullable();
    table.string('placa').notNullable();
    table.integer('ano').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('veiculos');
};
