const { sutando } = require('./sutando.js');

sutando.addConnection({
  client: 'pg',
  connection: {
    host : 'db.iqbgfizfhnjtrpohgfii.supabase.co',
    port : 5432,
    user : 'postgres',
    password : 'RcCAFGBMFu6ooJWg',
    database : 'postgres'
  }
});

module.exports = sutando.connection();