import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // UUID extension is usually available or we just use gen_random_uuid()
  
  // Users table
  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string("email").notNullable().unique();
      table.string("password");
      table.string("full_name");
      table.timestamps(true, true);
    });
  }

  // Organizations table
  if (!(await knex.schema.hasTable("organizations"))) {
    await knex.schema.createTable("organizations", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string("name").notNullable();
      table.timestamps(true, true);
    });
  }

  // Organization Users table / Staff
  if (!(await knex.schema.hasTable("organization_users"))) {
    await knex.schema.createTable("organization_users", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid("organization_id").notNullable().references("id").inTable("organizations").onDelete("CASCADE");
      table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.string("role").notNullable().defaultTo("member");
      table.timestamps(true, true);
      table.unique(["organization_id", "user_id"]);
    });
  }

  // Clients table
  if (!(await knex.schema.hasTable("clients"))) {
    await knex.schema.createTable("clients", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid("organization_id").notNullable().references("id").inTable("organizations").onDelete("CASCADE");
      table.string("name").notNullable();
      table.string("email");
      table.text("address");
      table.timestamps(true, true);
    });
  }

  // Invoices table
  if (!(await knex.schema.hasTable("invoices"))) {
    await knex.schema.createTable("invoices", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid("organization_id").notNullable().references("id").inTable("organizations").onDelete("CASCADE");
      table.uuid("client_id").references("id").inTable("clients").onDelete("SET NULL");
      table.string("invoice_number").notNullable();
      table.string("status").notNullable().defaultTo("Draft");
      table.decimal("subtotal", 10, 2).notNullable().defaultTo(0);
      table.decimal("tax", 10, 2).notNullable().defaultTo(0);
      table.decimal("total", 10, 2).notNullable().defaultTo(0);
      table.date("due_date");
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("invoices");
  await knex.schema.dropTableIfExists("clients");
  await knex.schema.dropTableIfExists("organization_users");
  await knex.schema.dropTableIfExists("organizations");
  await knex.schema.dropTableIfExists("users");
}
