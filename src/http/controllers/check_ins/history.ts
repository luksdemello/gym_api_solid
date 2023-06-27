import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use_cases/factories/make_fetch_user_check_ins_use_case'

export async function historyController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  const historyQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = historyQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()
  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub
  })

  return reply.status(200).send({ checkIns })
}
