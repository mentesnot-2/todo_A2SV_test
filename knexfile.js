
module.exports = {
    development: {
      client: 'pg',
      connection: {
        database: 'ordermanagement',
        user: 'postgres',
        password: '1234',
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './db/migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    },
  };
  