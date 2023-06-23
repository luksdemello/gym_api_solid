import { beforeEach, describe, expect, it } from 'vitest'
import { type GymsRepository } from '@/repositories/gym/gyms_repository'
import { InMemoryGymsRepository } from '@/repositories/gym/in_memory_gyms_repository'
import { FeatchNearbyGymsUseCase } from './fetch_nearby_gyms'

let gymsRepository: GymsRepository
// system under test
let sut: FeatchNearbyGymsUseCase

describe('Fetch Nearby Gyms UseCase', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    // system under test
    sut = new FeatchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'any_gym',
      description: 'any_description',
      phone: 'any_phone',
      latitude: -22.8360905,
      longitude: -47.0974129
    })

    await gymsRepository.create({
      title: 'another_gym',
      description: 'any_description',
      phone: 'any_phone',
      latitude: -22.8436446,
      longitude: -47.2107094
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.8585935,
      userLongitude: -47.2240132
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'another_gym' })
    ])
  })
})
