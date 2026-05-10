const { Migration, sutando } = require('sutando');

module.exports = class extends Migration {
  /**
    * Run the migrations.
    */
  async up(schema) {
    await schema.createTable('invoice_items', (table) => {
      table.uuid("id").primary();
      table.uuid("invoice_id").notNullable().references("id").inTable("invoices").onDelete("CASCADE");
      table.string("description").notNullable();
      table.decimal("quantity", 12, 2).notNullable().defaultTo(1);
      table.decimal("unit_price", 12, 2).notNullable().defaultTo(0);
      table.decimal("amount", 12, 2).notNullable().defaultTo(0);
      table.timestamps();
    });
  }

  /**
    * Reverse the migrations.
    */
  async down(schema) {
    await schema.dropTableIfExists('invoice_items');
  }
};