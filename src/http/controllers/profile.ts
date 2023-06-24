import { type FastifyRequest, type FastifyReply } from 'fastify'

export async function profileController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  await request.jwtVerify()

  console.log(request.user.sub)

  return reply.status(200).send()
}
