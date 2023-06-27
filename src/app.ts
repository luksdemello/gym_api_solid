import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { usersRoutes } from './http/controllers/users/routes'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.log(error)
  } else {
    // TODO: log to an external tool like DataDog/Sentry/NewRelic
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})

export { app }
