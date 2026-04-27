import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("invoice_items", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid("invoice_id").notNullable().references("id").inTable("invoices").onDelete("CASCADE");
    table.string("description").notNullable();
    table.decimal("quantity", 12, 2).notNullable().defaultTo(1);
    table.decimal("unit_price", 12, 2).notNullable().defaultTo(0);
    table.decimal("amount", 12, 2).notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("invoice_items");
}

