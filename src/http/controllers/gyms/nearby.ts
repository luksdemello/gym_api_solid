import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeFeatchNearbyGymsUseCase } from '@/use_cases/factories/make_fetch_nearby_gym_use_case'

export async function nearbyController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const fetchNearbyGymsUseCase = makeFeatchNearbyGymsUseCase()
  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  })

  return reply.status(200).send({ gyms })
}
