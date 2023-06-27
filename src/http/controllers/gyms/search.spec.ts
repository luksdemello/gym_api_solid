import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create_and_authenticate_user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token as string}`)
      .send({
        description: 'any description',
        latitude: -22.8585935,
        longitude: -47.2240132,
        phone: '0000000',
        title: 'Node Gym'
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token as string}`)
      .send({
        description: 'any description',
        latitude: -22.8585935,
        longitude: -47.2240132,
        phone: '0000000',
        title: 'Any Gym'
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Node'
      })
      .set('Authorization', `Bearer ${token as string}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Node Gym'
      })
    ])
  })
})
