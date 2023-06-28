import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create_and_authenticate_user'
import { prisma } from '@/lib/prisma'

describe('Validate check in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check ins', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Any Gym',
        latitude: -22.8585935,
        longitude: -47.2240132
      }
    })

    let checkIn = await prisma.checkin.create({
      data: {
        gym_id: gym.id,
        user_id: user.id
      }
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token as string}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkin.findUniqueOrThrow({
      where: {
        id: checkIn.id
      }
    })

    expect(checkIn.is_validated).toEqual(expect.any(Date))
  })
})
