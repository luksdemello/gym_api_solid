import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeSearchGymsUseCase } from '@/use_cases/factories/make_search_gyms_use_case'

export async function searchController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchGymUseCase.execute({ query, page })

  return reply.status(200).send({ gyms })
}
