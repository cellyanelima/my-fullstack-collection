import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTrip } from '../apis/apiClient'
import { Trip, TripData } from '../../models/trips'

export default function EditTrip({ trip }: { trip: Trip }) {
  const [editedTrip, setEditedTrip] = useState(trip)
  const queryClient = useQueryClient()

  const editMutation = useMutation<
    Trip,
    Error,
    { id: number; updatedTrip: TripData }
  >({
    mutationFn: ({ id, updatedTrip }) => updateTrip(id, updatedTrip),
    onSuccess: (updatedTrip) => {
      // Atualiza o cache do React Query
      queryClient.setQueryData(['trips'], (oldTrips: Trip[] | undefined) => {
        if (!oldTrips) return []
        return oldTrips.map((t) => (t.id === updatedTrip.id ? updatedTrip : t))
      })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedTrip((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    editMutation.mutate({ id: editedTrip.id, updatedTrip: editedTrip })
  }

  return (
    <div className="travel-card">
      <div className="travel-card-content">
        <h2 className="travel-card-title">Edit Trip</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="location"
            value={editedTrip.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <input
            className="travel-card-description"
            name="title"
            value={editedTrip.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            className="travel-card-description"
            name="year"
            value={editedTrip.year}
            onChange={handleChange}
            placeholder="Year"
          />
          <input
            className="travel-card-description"
            name="description"
            value={editedTrip.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <button
            className="travel-card-button:hover"
            type="submit"
            disabled={editMutation.isPending}
          >
            {editMutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  )
}
