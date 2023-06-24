import { type FastifyInstance } from 'fastify'
import { registerController } from './controllers/register'
import { authenticateController } from './controllers/authenticate'
import { profileController } from './controllers/profile'
import { verifyJwt } from './middleware/verify_jwt'

export async function appRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', registerController)

  app.post('/sessions', authenticateController)

  app.get('/me', { onRequest: [verifyJwt] }, profileController)
}
