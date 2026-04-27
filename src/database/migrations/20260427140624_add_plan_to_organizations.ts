import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("organizations", (table) => {
        table.string("plan").defaultTo("free");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("organizations", (table) => {
        table.dropColumn("plan");
    });
}

