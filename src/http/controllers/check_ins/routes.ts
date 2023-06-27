import { type FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middleware/verify_jwt'
import { createCheckInController } from './create'
import { validateCheckInController } from './validate'
import { historyController } from './history'
import { metricsController } from './metrics'

export async function checkInsRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', historyController)
  app.get('/check-ins/metrics', metricsController)
  app.post('/gyms/:gymId/checki-ins', createCheckInController)
  app.patch('/check-ins/:checkInId/validate', validateCheckInController)
}
