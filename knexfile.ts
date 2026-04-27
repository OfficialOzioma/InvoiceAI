import type { Knex } from "knex";
import 'dotenv/config';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: process.env.DATABASE_URL ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    } : "postgres://postgres:postgres@localhost:5432/postgres",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations"
    }
  }

};

export default config;
