import TripForm from './TripForm.tsx'
import Headers from './Header.tsx'
import Footer from './Footer.tsx'
import EditTrip from './EditTrip.tsx'
import TripsList from './TripsList.tsx'
import { useState } from 'react'
import { Trip } from '../../models/trips.ts'

function App() {
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null)

  const handleEditClick = (trip: Trip) => {
    setEditingTrip(trip)
  }

  const handleCancelEdit = () => {
    setEditingTrip(null)
  }

  return (
    <>
      <Headers />
      <br />
      <section className="main">
        {editingTrip ? (
          <EditTrip trip={editingTrip} onCancel={handleCancelEdit} />
        ) : (
          <>
            <TripForm />
            <TripsList onEdit={handleEditClick} />
          </>
        )}
      </section>
      <Footer />
    </>
  )
}

export default App
