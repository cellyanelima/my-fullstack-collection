import { Trip, TripData } from '../../models/trips'
import connection from './connection'

const db = connection

export function getTrips(): Promise<Trip[]> {
  return db('trips').select()
}

export function getTripById(id: number): Promise<Trip> {
  return db('trips').where({ id }).select().first()
}

export function addTrip(newTrip: TripData) {
  return db('trips').insert(newTrip)
}

export async function updateLocationAno(updatedTrip: Trip): Promise<Trip> {
  const { id, location, title, description, image, alt, year, done } =
    updatedTrip

  await db('trips').where({ id }).update({
    location,
    year,
    title,
    description,
    image,
    alt,
    done,
  })

  const updatedRecord = await db('trips').where({ id }).first()
  return updatedRecord as Trip
}

export function updateTripDone(id: number): Promise<number> {
  return db('trips').where({ id }).update('done', true)
}

export function updateTripNotDone(id: number): Promise<number> {
  return db('trips').where({ id }).update('done', false)
}

export function deleteTrip(id: number) {
  return db('trips').where({ id }).del()
}
