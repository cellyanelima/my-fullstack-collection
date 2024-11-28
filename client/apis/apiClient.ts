import request from 'superagent'
import { Trip, TripData } from '../../models/trips'

const rootURL = '/api/v1/trips'

export async function fetchTrips(): Promise<Trip[]> {
  const res = await request.get(rootURL)
  return res.body
}

export async function fetchTripById(id: number): Promise<Trip> {
  const res = await request.get(`${rootURL}/${id}`)
  return res.body
}

export async function addNewTrip(newTrip: TripData) {
  await request.post(rootURL).send(newTrip)
}
