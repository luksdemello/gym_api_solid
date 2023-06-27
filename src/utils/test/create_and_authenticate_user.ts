import { type FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server)
    .post('/users')
    .send({
      name: 'any_name',
      email: 'any@email.com',
      password: 'any_password'
    })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'any@email.com',
      password: 'any_password'
    })

  const { token } = authResponse.body

  return { token }
}
