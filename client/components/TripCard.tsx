import DeleteTrip from './DeleteTrip'
import EditTrip from './EditTrip'
import { Trip } from '../../models/trips'

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="travel-card">
      <img className="travel-card-img" src={trip.image} alt={trip.title} />
      <div className="travel-card-content">
        <p className="travel-card-location-description ">{trip.location}</p>
        <h3 className="travel-card-title">{trip.title}</h3>
        <p className="travel-card-description">{trip.description}</p>

        <p className="travel-card-description">Year: {trip.year}</p>
        <p className="travel-card-description">
          {trip.done ? 'Completed' : 'Not Completed'}
        </p>
        <div className="actions">
          <DeleteTrip tripId={trip.id} />
          <EditTrip trip={trip} />
        </div>
      </div>
    </div>
  )
}
