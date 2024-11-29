import TripForm from './TripForm.tsx'
import TripsLis from './TripsList.tsx'
import Headers from './Header.tsx'
import Footer from './Footer.tsx'
//import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Headers />
      <br></br>
      <section className="main">
        <TripForm />
        <br></br>
        <TripsLis />
      </section>
      <Footer />
    </>
  )
}

export default App
