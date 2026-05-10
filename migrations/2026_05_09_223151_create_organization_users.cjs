const { Migration, sutando } = require('sutando');

module.exports = class extends Migration {
  /**
    * Run the migrations.
    */
  async up(schema) {
    await schema.createTable('organization_users', (table) => {
      table.uuid("id").primary();
      table.uuid("organization_id").notNullable().references("id").inTable("organizations").onDelete("CASCADE");
      table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.string("role").notNullable().defaultTo("member");
      // table.unique(["organization_id", "user_id"]);
      table.timestamps();
    });
  }

  /**
    * Reverse the migrations.
    */
  async down(schema) {
    await schema.dropTableIfExists('organization_users');
  }
};