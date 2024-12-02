/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('trips').del()
  await knex('trips').insert([
    {
      id: 1,
      location: 'Rio de Janeiro',
      title: 'Wonderful City',
      description: 'It was so good.',
      image: '/image/rio-de-janeiro-brazil.webp',
      alt: 'Christ the Redeemer',
      year: '2013',
      done: '1',
    },
    {
      id: 2,
      location: 'Belo Horizonte',
      title: 'Wonderful City',
      description: 'It was so good.',
      image: '/image/belo-horizonte-brazil.webp',
      alt: 'City Museum',
      year: '2018',
      done: '1',
    },
    {
      id: 3,
      location: 'Fernando de Noronha',
      title: 'Wonderful City',
      description: 'I hope this travel will have a great time .',
      image: '/image/fernandodenoronha-brazil.webp',
      alt: 'Beautiful island',
      year: '2025',
      done: '0',
    },
  ])
}
