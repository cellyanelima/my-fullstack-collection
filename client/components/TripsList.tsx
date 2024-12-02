import { useQuery } from '@tanstack/react-query'
import { Trip } from '../../models/trips'
import { fetchTrips } from '../apis/apiClient'
import TripCard from './TripCard'

export default function TripsList({
  onEdit,
}: {
  onEdit: (trip: Trip) => void
}) {
  const {
    data: trips,
    isLoading,
    isError,
  } = useQuery<Trip[]>({ queryKey: ['trips'], queryFn: fetchTrips })

  if (isError)
    return (
      <p className="error-message">An error occurred while fetching trips.</p>
    )
  if (isLoading) return <p className="loading-message">Loading trips...</p>
  if (!trips || trips.length === 0)
    return <p className="error-message">No trips found.</p>

  return (
    <div className="travel-list">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} onEdit={onEdit} />
      ))}
    </div>
  )
}
