import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("organizations", (table) => {
        table.string("industry");
        table.string("business_type");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("organizations", (table) => {
        table.dropColumn("industry");
        table.dropColumn("business_type");
    });
}

