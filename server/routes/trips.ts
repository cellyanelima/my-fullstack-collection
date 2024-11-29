import Router from 'express'
import * as db from '../db/db'

const router = Router()

// GET 'api/v1/trips'
router.get('/', async (req, res) => {
  try {
    const trips = await db.getTrips()
    res.json(trips)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.status(500).json({ error: 'Failed to fetch trips' })
  }
})

// GET 'api/v1/trips/:id'
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' })

  try {
    const trip = await db.getTripById(id)
    if (!trip) return res.status(404).json({ error: 'Trip not found' })
    res.json(trip)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.status(500).json({ error: 'Failed to fetch trip' })
  }
})

// POST 'api/v1/trips'
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const updatedTrip = req.body
  if (
    isNaN(id) ||
    !updatedTrip.location ||
    !updatedTrip.year ||
    !updatedTrip.title ||
    !updatedTrip.description
  ) {
    return res.status(400).json({ error: 'Invalid request data' })
  }
  try {
    const trip = await db.updateLocationAno({ id, ...updatedTrip })
    res.status(200).json(trip) // Retorna os dados atualizados
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.status(500).json({ error: 'Failed to update trip' })
  }
})

// PATCH 'api/v1/trips/done/:id'
router.patch('/done/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID invalid' })
  }
  try {
    await db.updateTripDone(id)
    res.status(200).json({ message: 'Trip marked as completed' })
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.status(500).json({ error: 'Failed to update trip' })
  }
})

// PATCH 'api/v1/trips/not-done/:id'
router.patch('/not-done/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID invalid' })
  }
  try {
    await db.updateTripNotDone(id)
    res.status(200).json({ message: 'Trip marked as not completed' })
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.status(500).json({ error: 'Failed to update trip' })
  }
})

// DELETE 'api/v1/trips/:id'
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' })

  try {
    await db.deleteTrip(id)
    res.status(200).json({ message: 'Trip deleted successfully' })
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.status(500).json({ error: 'Failed to delete trip' })
  }
})

export default router
