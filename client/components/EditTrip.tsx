import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTrip, deleteTrip } from '../apis/apiClient'
import { Trip, TripData } from '../../models/trips'

interface EditTripProps {
  trip: Trip
  onCancel: () => void // Callback para cancelar a edição
}

export default function EditTrip({ trip, onCancel }: EditTripProps) {
  const [editedTrip, setEditedTrip] = useState<Trip>(trip)
  const queryClient = useQueryClient()

  // Mutation para edição
  const editMutation = useMutation<
    Trip,
    Error,
    { id: number; updatedTrip: TripData }
  >({
    mutationFn: ({ id, updatedTrip }) => updateTrip(id, updatedTrip),
    onSuccess: (updatedTrip) => {
      queryClient.setQueryData(['trips'], (oldTrips: Trip[] | undefined) => {
        if (!oldTrips) return []
        return oldTrips.map((t) => (t.id === updatedTrip.id ? updatedTrip : t))
      })
      onCancel() // Voltar à lista após salvar
    },
  })

  // Mutation para exclusão
  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: (id) => deleteTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] })
      onCancel()
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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteMutation.mutate(editedTrip.id)
    }
  }

  return (
    <div className="travel-card">
      <div className="travel-card-content">
        <h2 className="travel-card-title">Edit Trip </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="location-label">Location </label>
            <input
              id="location-label"
              name="location"
              value={editedTrip.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </div>
          <br />
          <div>
            <label htmlFor="title-label">Title</label>
            <input
              id="title-label"
              className="travel-card-description"
              name="title"
              value={editedTrip.title}
              onChange={handleChange}
              placeholder="Enter title"
            />
          </div>
          <br />
          <div>
            <label htmlFor="year-label">Year </label>
            <input
              id="year-label"
              className="travel-card-description"
              name="year"
              value={editedTrip.year}
              onChange={handleChange}
              placeholder="Enter year"
            />
          </div>
          <br />
          <div>
            <label htmlFor="description-label">Description </label>
            <input
              id="description-label"
              className="travel-card-description"
              name="description"
              value={editedTrip.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>
          <div className="buttons">
            <button
              className="travel-card-button"
              type="submit"
              disabled={editMutation.isPending}
            >
              {editMutation.isPending ? 'Saving...' : 'Save'}
            </button>

            <button
              className="travel-card-button cancel-button"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              className="travel-card-button delete-button"
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
