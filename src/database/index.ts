import { sutando } from 'sutando';
import knex from 'knex';
import knexConfig from '../../knexfile.js';

// Setup connection based on environment
const env = process.env.NODE_ENV || 'development';
const config = knexConfig[env];

const db = knex(config);

sutando.addConnection(config, 'default');

export default sutando;
