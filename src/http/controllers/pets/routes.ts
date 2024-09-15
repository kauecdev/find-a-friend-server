import type { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'
import { create } from './create'
import { fetch } from './fetch'
import { getDetails } from './get-details'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pets', fetch)
  app.get('/pets/:id', getDetails)

  // Authenticate routes
  app.post('/ngos/:ngoId/pets', { onRequest: [verifyJwt] }, create)
}
