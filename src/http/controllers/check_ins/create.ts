import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeCheckInUseCase } from '@/use_cases/factories/make_check_in_use_case'

export async function createCheckInController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const checkInUseCase = makeCheckInUseCase()
  await checkInUseCase.execute({
    userLatitude: latitude,
    userLogintude: longitude,
    gymId,
    userId: request.user.sub
  })

  return reply.status(201).send()
}
