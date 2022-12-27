import knexObj from 'knex';

export default knexObj({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: '123456',
    database: 'online_academy'
  },
  pool: { min: 0, max: 10 }
});
