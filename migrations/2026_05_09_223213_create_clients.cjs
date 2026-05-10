const { Migration, sutando } = require('sutando');

module.exports = class extends Migration {
  /**
    * Run the migrations.
    */
  async up(schema) {
    await schema.createTable('clients', (table) => {
      table.uuid("id").primary();
      table.uuid("organization_id").notNullable().references("id").inTable("organizations").onDelete("CASCADE");
      table.string("name").notNullable();
      table.string("email");
      table.text("address");
      table.timestamps();
    });
  }

  /**
    * Reverse the migrations.
    */
  async down(schema) {
    await schema.dropTableIfExists('clients');
  }
};