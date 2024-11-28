export interface TripData {
  location: string
  year: string
  done: boolean
}

export interface Trip extends TripData {
  id: number
}
