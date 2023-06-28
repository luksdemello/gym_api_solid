import { type FastifyRequest, type FastifyReply } from 'fastify'

export async function refreshController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyRequest> {
  await request.jwtVerify({ onlyCookie: true })

  const { role } = request.user

  const token = await reply.jwtSign({
    role
  }, {
    sub: request.user.sub
  })

  const refreshToken = await reply.jwtSign({
    role
  }, {
    sub: request.user.sub,
    expiresIn: '7d'
  })

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .status(200).send({
      token
    })
}
