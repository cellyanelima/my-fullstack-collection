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
router.post('/', async (req, res) => {
  const newTrip = req.body
  if (!newTrip.location || !newTrip.year || newTrip.done === undefined) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    await db.addTrip(newTrip)
    res.status(201).json({ message: 'Trip added successfully' })
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.status(500).json({ error: 'Failed to add trip' })
  }
})

// PATCH 'api/v1/trips/:id'
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { location, year, done } = req.body

  if (isNaN(id) || !location || !year) {
    return res.status(400).json({ error: 'Invalid request data' })
  }
  try {
    await db.updateLocationAno({ id, location, year, done })
    res.status(200).json({ message: 'Trip updated to done' })
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
