import { beforeEach, describe, expect, it } from 'vitest'
import { type GymsRepository } from '@/repositories/gym/gyms_repository'
import { SearchGymsUseCase } from './search_gyms'
import { InMemoryGymsRepository } from '@/repositories/gym/in_memory_gyms_repository'

let gymsRepository: GymsRepository
// system under test
let sut: SearchGymsUseCase

describe('Search Gyms UseCase', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    // system under test
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to fetch check ins history', async () => {
    await gymsRepository.create({
      title: 'any_gym',
      description: 'any_description',
      phone: 'any_phone',
      latitude: 0,
      longitude: 0
    })

    await gymsRepository.create({
      title: 'another_gym',
      description: 'any_description',
      phone: 'any_phone',
      latitude: 0,
      longitude: 0
    })

    const { gyms } = await sut.execute({
      query: 'any_gym',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'any_gym' })
    ])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `any_gym ${i}`,
        description: 'any_description',
        phone: 'any_phone',
        latitude: 0,
        longitude: 0
      })
    }

    const { gyms } = await sut.execute({
      query: 'any_gym',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'any_gym 21' }),
      expect.objectContaining({ title: 'any_gym 22' })
    ])
  })
})
