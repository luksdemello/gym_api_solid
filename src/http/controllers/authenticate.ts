import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { InvalidCredentialError } from '@/errors/invalid_credential_error'
import { makeAuthenticateUseCase } from '@/use_cases/factories/make_authenticate_use_case'

export async function authenticateController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign({}, {
      sub: user.id
    })

    return reply.status(200).send({
      token
    })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(error.status).send({ message: error.message })
    }
    return reply.status(500).send()
  }
}
