const { Migration, sutando } = require('sutando');

module.exports = class extends Migration {
  /**
    * Run the migrations.
    */
  async up(schema) {
    await schema.createTable('invoices', (table) => {
      table.uuid("id").primary();
      table.uuid("organization_id").notNullable().references("id").inTable("organizations").onDelete("CASCADE");
      table.uuid("client_id").references("id").inTable("clients").onDelete("SET NULL");
      table.string("invoice_number").notNullable();
      table.string("status").notNullable().defaultTo("Draft");
      table.decimal("subtotal", 10, 2).notNullable().defaultTo(0);
      table.decimal("tax", 10, 2).notNullable().defaultTo(0);
      table.decimal("total", 10, 2).notNullable().defaultTo(0);
      table.date("due_date");
      table.timestamps();
    });
  }

  /**
    * Reverse the migrations.
    */
  async down(schema) {
    await schema.dropTableIfExists('users_invoices');
  }
};