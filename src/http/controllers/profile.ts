import { makeGetUserProfileUseCase } from '@/use_cases/factories/make_get_user_profile_use_case'
import { type FastifyRequest, type FastifyReply } from 'fastify'

export async function profileController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  await request.jwtVerify()

  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({ userId: request.user.sub })
  return reply.status(200).send(user)
}
