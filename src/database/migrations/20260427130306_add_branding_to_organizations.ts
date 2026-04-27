import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hasPrimary = await knex.schema.hasColumn("organizations", "primary_color");
    const hasSecondary = await knex.schema.hasColumn("organizations", "secondary_color");
    const hasTemplate = await knex.schema.hasColumn("organizations", "template_id");

    await knex.schema.alterTable("organizations", (table) => {
        if (!hasPrimary) {
            table.string("primary_color").defaultTo("#3B82F6");
        }
        if (!hasSecondary) {
            table.string("secondary_color").defaultTo("#0F172A");
        }
        if (!hasTemplate) {
            table.string("template_id").defaultTo("modern");
        }
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("organizations", (table) => {
        table.dropColumn("primary_color");
        table.dropColumn("secondary_color");
        table.dropColumn("template_id");
    });
}

