const { Migration, sutando } = require('sutando');

module.exports = class extends Migration {
  /**
    * Run the migrations.
    */
  async up(schema) {
    await schema.createTable('organizations', (table) => {
      table.uuid('id').primary();
      table.string("name");
      table.string("primary_color");
      table.string("secondary_color");
      table.string("template_id");
      table.string("plan");
      table.string("industry");
      table.string("business_type");
      table.string("email");
      table.string("phone");
      table.string("address");
      table.string("logo_url");
      table.string("tax_id");
      table.timestamps();
    });
  }

  /**
    * Reverse the migrations.
    */
  async down(schema) {
    await schema.dropTableIfExists('users_organizations');
  }
};