import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

const app = fastify()

app.register(appRoutes)
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
