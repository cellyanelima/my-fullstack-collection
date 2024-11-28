import * as Path from 'node:path'

import express from 'express'

import trips from './routes/trips.js'

const server = express()
server.use(express.json())
server.use('/api/v1/trips', trips) // localhost:3000/api/v1/trips

// ADD YOUR API ROUTES HERE

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
