import knex from 'knex';
import config from './knexfile.js';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
  const env = process.env.NODE_ENV || 'development';
  const dbConfig = config[env];
  
  console.log(`Testing connection using environment: ${env}`);
  console.log(`Database Client: ${dbConfig.client}`);
  
  if (!process.env.DATABASE_URL) {
    console.warn('WARNING: DATABASE_URL environment variable is NOT set. Knex will likely try to connect to localhost.');
  } else {
    console.log('DATABASE_URL is set.');
  }

  const db = knex(dbConfig);
  
  try {
    console.log('Attempting to connect...');
    const result = await db.raw('SELECT 1+1 as result');
    console.log('SUCCESS: Connection established!', result.rows);
  } catch (err: any) {
    console.error('FAILURE: Could not connect to the database.');
    console.error(`Error Code: ${err.code}`);
    console.error(`Error Message: ${err.message}`);
    
    if (err.code === 'ECONNREFUSED') {
      console.log('\nPossible causes:');
      console.log('1. DATABASE_URL is missing or incorrect (pointing to localhost).');
      console.log('2. The remote database (Supabase) is down or refusing connections.');
      console.log('3. Firewall rules/IP allowlisting on Supabase are blocking this environment.');
    }
  } finally {
    await db.destroy();
  }
}

testConnection();
