exports.seed = async function(knex) {
  await knex('veiculos').del();
  await knex('veiculos').insert([
    { marca: 'Volvo', modelo: 'FH 540', placa: 'ABC-1234', ano: 2021 }
  ]);
};
