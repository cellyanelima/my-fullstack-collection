/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('trips').del()
  await knex('trips').insert([
    { id: 1, location: 'Rio de Janeiro', year: '2013', done: '1' },
    { id: 2, location: 'Belo Horizonte', year: '2018', done: '1' },
    { id: 3, location: 'Fernando de Noronha', year: '2025', done: '0' },
  ])
}
