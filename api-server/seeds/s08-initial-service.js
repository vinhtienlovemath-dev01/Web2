exports.seed = async function(knex) {
  await knex('service').del()
  await knex('service').insert([
    {service_name: 'Sauna', service_price: '300'},
    {service_name: 'Breakfast', service_price: '100'},
    {service_name: 'Parking', service_price: '50'},
    {service_name: 'Car Rental', service_price: '200'},
    {service_name: 'Motobike Rental', service_price: '50'},
  ]);
};