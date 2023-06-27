import { z } from 'zod'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeValidateCheckInUsecase } from '@/use_cases/factories/make_validate_check_ins_use_case'

export async function validateCheckInController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUsecase()
  await validateCheckInUseCase.execute({
    checkInId
  })

  return reply.status(204).send()
}
