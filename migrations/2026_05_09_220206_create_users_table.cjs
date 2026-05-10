const {
    Migration
} = require('sutando');

module.exports = class extends Migration {
    /**
     * Run the migrations.
     */
    async up(schema) {
        await schema.createTable('users', (table) => {
            table.uuid('id').primary();
            table.string('full_name');
            table.string('email').unique();
            table.string("auth_provider").defaultTo("manual"); // 'manual' or 'google'
            table.string("otp_code").nullable();
            table.timestamp("otp_expires_at").nullable();
            table.boolean("is_verified").defaultTo(false);
            table.string('password');
            table.timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    async down(schema) {
        await schema.dropTableIfExists('users');
    }
};