import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/user/prisma_users_repository'
import { AuthenticateUseCase } from '@/use_cases/authenticate'
import { InvalidCredentialError } from '@/errors/invalid_credential_error'

export async function authenticateController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
    await authenticateUseCase.execute({ email, password })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(error.status).send({ message: error.message })
    }
    return reply.status(500).send()
  }
}
