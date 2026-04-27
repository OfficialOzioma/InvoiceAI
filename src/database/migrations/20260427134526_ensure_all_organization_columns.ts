import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const table = "organizations";
    const columns = [
        { name: "email", type: "string" },
        { name: "phone", type: "string" },
        { name: "address", type: "text" },
        { name: "logo_url", type: "text" },
        { name: "tax_id", type: "string" },
        { name: "currency", type: "string", default: "USD" },
        { name: "primary_color", type: "string", default: "#3B82F6" },
        { name: "secondary_color", type: "string", default: "#0F172A" },
        { name: "template_id", type: "string", default: "modern" }
    ];

    for (const col of columns) {
        const hasColumn = await knex.schema.hasColumn(table, col.name);
        if (!hasColumn) {
            await knex.schema.alterTable(table, (t) => {
                let column;
                if (col.type === "text") {
                    column = t.text(col.name);
                } else {
                    column = t.string(col.name);
                }
                
                if (col.default) {
                    column.defaultTo(col.default);
                }
            });
        }
    }
}


export async function down(knex: Knex): Promise<void> {
    // No-op to avoid breaking data
}

