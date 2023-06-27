import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use_cases/factories/make_get_user_metrics_use_case'

export async function metricsController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub
  })

  return reply.status(200).send({ checkInsCount })
}
