import type { FastifyInstance } from 'fastify'

import { create } from './create'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function ngoRoutes(app: FastifyInstance) {
  app.post('/ngos', create)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
