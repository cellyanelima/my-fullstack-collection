import { useState } from 'react'
import { TripData } from '../../models/trips'
import { addNewTrip } from '../apis/apiClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function TripForm() {
  const [newTrip, setNewTrip] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newYear, setNewYear] = useState('')
  const [newImage, setNewImage] = useState('')

  //const [submitTrip, setSubmitTrip] = useState('') // change to useMutation

  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: (trip: TripData) => addNewTrip(trip),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] }),
  })

  const handleChangeTrip = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTrip(e.target.value)
    setNewTrip('')
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
    setNewTitle('')
  }

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewYear(e.target.value)
    setNewYear('')
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value)
    setNewDescription('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //setSubmitTrip(newTrip)
    addMutation.mutate({
      image: '',
      location: newTrip,
      title: newTitle,
      year: newYear,
      done: false,
      description: newDescription,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location"> Location</label>
        <input
          onChange={handleChangeTrip}
          value={newTrip}
          id="location"
        ></input>

        <label htmlFor="title"> Title </label>
        <input onChange={handleChangeTitle} value={newTitle} id="title"></input>

        <label htmlFor="year"> Year </label>
        <input onChange={handleChangeYear} value={newYear} id="year"></input>

        <label htmlFor="handleChangeDescription"> Description </label>
        <input
          onChange={handleChangeDescription}
          value={newDescription}
          id="description"
        ></input>

        <button>Submit</button>
      </form>
    </>
  )
}
