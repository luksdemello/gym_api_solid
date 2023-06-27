import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeCreateGymUseCase } from '@/use_cases/factories/make_create_gym_use_case'

export async function createGymController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()
  await createGymUseCase.execute({ title, description, phone, latitude, longitude })

  return reply.status(201).send()
}
