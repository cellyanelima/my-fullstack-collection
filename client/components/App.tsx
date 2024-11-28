import TripForm from './TripForm'
import TripsLis from './TripsList'

function App() {
  return (
    <>
      <header className="header">
        <h1>My Trips</h1>
      </header>
      <section className="main">
        <TripForm />
        <TripsLis />
      </section>
    </>
  )
}

export default App
