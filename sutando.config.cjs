// Update with your config settings.

module.exports =  {
  client: 'pg',
  connection: {
    host : 'aws-0-eu-west-1.pooler.supabase.com',
    port : 6543,
    user : 'postgres.iqbgfizfhnjtrpohgfii',
    password : 'RcCAFGBMFu6ooJWg',
    database : 'postgres'
  },
  migrations: {
    table: 'migrations',
    path: './migrations',
  },
  models: {
    path: './models'
  }
};
