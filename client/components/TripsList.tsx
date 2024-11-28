import { useQuery } from '@tanstack/react-query'
import { Trip } from '../../models/trips'
import { fetchTrips } from '../apis/apiClient'

export default function TripsLis() {
  const {
    data: trips,
    isPending,
    isError,
  } = useQuery({ queryKey: ['trips'], queryFn: () => fetchTrips() })

  if (isError) {
    return <p>Error...</p>
  }

  if (isPending) {
    return <p>Loading...</p>
  }

  /*const trips = [
    {
      location: 'Canada',
      year: '2027',
      done: Boolean(false),
    },
    {
      location: 'Russia',
      year: '2017',
      done: Boolean(true),
    },
    {
      location: 'Belgium',
      year: '2015',
      done: Boolean(false),
    },
  ] as Trip[]*/

  return (
    <>
      <div className="travel-list">
        {trips.map((trip, i) => {
          return (
            <p key={i}>
              {trip.location} year = {trip.year} done = {trip.done}
            </p>
          )
        })}
      </div>
    </>
  )
}
