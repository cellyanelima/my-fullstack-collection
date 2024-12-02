export interface TripData {
  location: string
  title: string
  description: string
  image?: string
  alt?: string
  year: string
  done: boolean
}

export interface Trip extends TripData {
  id: number
}
