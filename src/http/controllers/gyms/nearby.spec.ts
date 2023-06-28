import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create_and_authenticate_user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .get('/gyms')
      .set('Authorization', `Bearer ${token as string}`)
      .send({
        title: 'any_gym',
        description: 'any_description',
        phone: 'any_phone',
        latitude: -22.8360905,
        longitude: -47.0974129
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token as string}`)
      .send({
        title: 'another_gym',
        description: 'any_description',
        phone: 'any_phone',
        latitude: -22.8436446,
        longitude: -47.2107094
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -22.8436446,
        longitude: -47.2107094
      })
      .set('Authorization', `Bearer ${token as string}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'another_gym'
      })
    ])
  })
})
