import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { UserAlreadyExistsError } from '@/errors/user_already_exists_error'
import { makeRegisterUseCase } from '@/use_cases/factories/make_register_use_case'

export async function registerController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({ name, email, password })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(error.status).send({ message: error.message })
    }
    return reply.status(500).send()
  }
}
