import { type FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middleware/verify_jwt'
import { registerController } from './register'
import { authenticateController } from './authenticate'
import { profileController } from './profile'
import { refreshController } from './refresh'

export async function usersRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', registerController)

  app.post('/sessions', authenticateController)
  app.patch('/token/refresh', refreshController)

  app.get('/me', { onRequest: [verifyJwt] }, profileController)
}
