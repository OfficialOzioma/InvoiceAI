import knex from 'knex';
import config from '../knexfile.ts';
import 'dotenv/config';

async function testConnection() {
    const env = process.env.NODE_ENV || 'development';
    const dbConfig = config[env];
    const db = knex(dbConfig);

    console.log(`Testing connection to: ${env} environment`);
    try {
        const result = await db.raw('SELECT NOW()');
        console.log('✅ Connection successful!');
        console.log('Current time from DB:', result.rows[0].now);
        process.exit(0);
    } catch (error: any) {
        console.error('❌ Connection failed!');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        if (error.message.includes('ntwheiaefnfqunsqomwy')) {
            console.log('\n💡 Hint: The project reference "ntwheiaefnfqunsqomwy" in your username is not being recognized by the Supabase pooler.');
            console.log('   1. Ensure you are connecting to the correct regional host (e.g., aws-0-eu-central-1.pooler.supabase.com).');
            console.log('   2. Double-check your project reference in the Supabase Dashboard settings.');
            console.log('   3. If using port 6543 (Transaction mode), the username MUST be "postgres.[PROJECT_REF]".');
        }
        process.exit(1);
    }
}

testConnection();
