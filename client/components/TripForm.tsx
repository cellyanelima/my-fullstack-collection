import { useState } from 'react'
import { TripData } from '../../models/trips'
import { addNewTrip } from '../apis/apiClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function TripForm() {
  const [newTrip, setnewTrip] = useState('')
  const [newYear, setnewYear] = useState('')

  //const [submitTrip, setSubmitTrip] = useState('') // change to useMutation

  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: (trip: TripData) => addNewTrip(trip),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] }),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewTrip(e.target.value)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewYear(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //setSubmitTrip(newTrip)
    addMutation.mutate({
      location: newTrip,
      year: newYear,
      done: false,
    })
  }

  // if (addMutation.isSuccess) {
  //  return <p>Submitted: {newTrip}</p>
  //}

  //console.log(submitTrip) // just to know if grab properly

  return (
    <>
      {/*<p>{newTrip}</p>
      <p>Submitted: {submitTrip}</p>*/}

      <form onSubmit={handleSubmit}>
        <label htmlFor="location"> Location</label>
        <input onChange={handleChange} value={newTrip} id="location"></input>
        <label htmlFor="year"> Year </label>
        <input onChange={handleYearChange} value={newYear} id="year"></input>
        <button>Submit</button>
      </form>
    </>
  )
}
