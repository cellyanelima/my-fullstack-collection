import { useQuery } from '@tanstack/react-query'
import { Trip } from '../../models/trips'
import { fetchTrips } from '../apis/apiClient'
import TripCard from './TripCard.tsx'

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

  return (
    <>
      <div className="travel-list">
        {trips.map((trip, index) => (
          <TripCard
            key={index}
            title={trip.title}
            description={trip.description}
            image={trip.image}
            location={trip.location}
            year={trip.year}
            done={trip.done}
          />
        ))}
      </div>
    </>
  )
}
