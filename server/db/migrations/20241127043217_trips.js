/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('trips', (table) => {
    table.increments()
    table.string('location')
    table.string('title')
    table.string('description')
    table.string('image')
    table.string('year')
    table.boolean('done')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('trips')
}
