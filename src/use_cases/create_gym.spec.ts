import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create_gym'
import { type GymsRepository } from '@/repositories/gym/gyms_repository'
import { InMemoryGymsRepository } from '@/repositories/gym/in_memory_gyms_repository'

let gymsRepository: GymsRepository
let sut: CreateGymUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'any_gym',
      description: 'any_description',
      phone: 'any_phone',
      latitude: 0,
      longitude: 0
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
