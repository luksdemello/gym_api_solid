import { type FastifyInstance } from 'fastify'
import { registerController } from './controllers/register'

export async function appRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', registerController)
}
