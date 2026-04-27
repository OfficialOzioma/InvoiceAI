import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.string("auth_provider").defaultTo("manual"); // 'manual' or 'google'
    table.string("otp_code").nullable();
    table.timestamp("otp_expires_at").nullable();
    table.boolean("is_verified").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("auth_provider");
    table.dropColumn("otp_code");
    table.dropColumn("otp_expires_at");
    table.dropColumn("is_verified");
  });
}

