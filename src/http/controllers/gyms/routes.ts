import { type FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middleware/verify_jwt'
import { searchController } from './search'
import { nearbyController } from './nearby'
import { createGymController } from './create'

export async function gymsRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', searchController)
  app.get('/gyms/nearby', nearbyController)
  app.post('/gyms', createGymController)
}
