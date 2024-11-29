import { useState } from 'react'
import { TripData } from '../../models/trips'
import { addNewTrip } from '../apis/apiClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function TripForm() {
  const [newTrip, setNewTrip] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newYear, setNewYear] = useState('')

  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: (trip: TripData) => addNewTrip(trip),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMutation.mutate({
      image: '',
      location: newTrip,
      title: newTitle,
      year: newYear,
      done: false,
      description: newDescription,
    })
    setNewTrip('')
    setNewTitle('')
    setNewDescription('')
    setNewYear('')
  }

  return (
    <div className="travel-card">
      <div className="travel-card-content">
        <h2 className="travel-card-title">Add New Trip</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="travel-card-description"
            onChange={(e) => setNewTrip(e.target.value)}
            value={newTrip}
            placeholder="Location"
          />
          <input
            className="travel-card-description"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            placeholder="Title"
          />
          <input
            className="travel-card-description"
            onChange={(e) => setNewYear(e.target.value)}
            value={newYear}
            placeholder="Year"
          />
          <input
            className="travel-card-description"
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            placeholder="Description"
          />
          <button className="travel-card-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
