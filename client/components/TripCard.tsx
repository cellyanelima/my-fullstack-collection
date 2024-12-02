import DeleteTrip from './DeleteTrip'
import EditTrip from './EditTrip'
import { Trip } from '../../models/trips'

export default function TripCard({
  trip,
  onEdit,
}: {
  trip: Trip
  onEdit: (trip: Trip) => void
}) {
  return (
    <div className="travel-card">
      <img className="travel-card-img" src={trip.image} alt={trip.alt} />
      <div className="travel-card-content">
        <h2 className="travel-card-location-description">{trip.location}</h2>
        <h3 className="travel-card-title">{trip.title}</h3>
        <p className="travel-card-description">{trip.description}</p>
        <p className="travel-card-description">Year: {trip.year}</p>
        <p className="travel-card-description">
          {trip.done ? 'Completed' : 'Not Completed'}
        </p>
        <div className="actions">
          <button className="travel-card-button" onClick={() => onEdit(trip)}>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}
