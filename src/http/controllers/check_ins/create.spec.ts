import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create_and_authenticate_user'
import { prisma } from '@/lib/prisma'

describe('Create check in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const gym = await prisma.gym.create({
      data: {
        title: 'Any Gym',
        latitude: -22.8585935,
        longitude: -47.2240132
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/checki-ins`)
      .set('Authorization', `Bearer ${token as string}`)
      .send({
        latitude: -22.8585935,
        longitude: -47.2240132
      })

    expect(response.statusCode).toEqual(201)
  })
})
