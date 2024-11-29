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
      image: '/image/Rio-de-Janeiro-Brazil.webp',
      year: '2013',
      done: '1',
    },
    {
      id: 2,
      location: 'Belo Horizonte',
      title: 'Wonderful City',
      description: 'It was so good.',
      image: '/image/Brazil-Belo-Horizonte.webp',
      year: '2018',
      done: '1',
    },
    {
      id: 3,
      location: 'Fernando de Noronha',
      title: 'Wonderful City',
      description: 'I hope this travel will have a great time .',
      image: '/image/fernandodenoronhaguide.jpg',
      year: '2025',
      done: '0',
    },
  ])
}
