import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './checkin'
import { InMemoryCheckInsRepository } from '@/repositories/checkin/in_memory_checkins_repository'
import { type CheckInsRepository } from '@/repositories/checkin/checkins_repository'
import { InMemoryGymsRepository } from '@/repositories/gym/in_memory_gyms_repository'
import { Decimal } from '@prisma/client/runtime'

let checkInRepository: CheckInsRepository
let gymsRepository: InMemoryGymsRepository
// system under test
let sut: CheckInUseCase

describe('Check In UseCase', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    // system under test
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    gymsRepository.gyms.push({
      id: 'any_gym',
      description: '',
      latitude: new Decimal(-22.8585935),
      longitude: new Decimal(-47.2240132),
      phone: '',
      title: 'Node Gym'
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'any_user',
      gymId: 'any_gym',
      userLatitude: -22.8585935,
      userLogintude: -47.2240132
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    const gym = await gymsRepository.create({
      id: 'any_gym2',
      description: '',
      latitude: new Decimal(-22.8610841),
      longitude: new Decimal(-47.2169174),
      phone: '',
      title: 'Node Gym'
    })

    await expect(async () => sut.execute({
      userId: 'any_user',
      gymId: gym.id,
      userLatitude: -22.8585935,
      userLogintude: -47.2240132
    })).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice in the same day', async () => {
    const date = new Date(2023, 5, 21, 8)
    vi.setSystemTime(date)

    await sut.execute({
      userId: 'any_user',
      gymId: 'any_gym',
      userLatitude: -22.8585935,
      userLogintude: -47.2240132
    })

    await expect(async () => sut.execute({
      userId: 'any_user',
      gymId: 'any_gym',
      userLatitude: -22.8585935,
      userLogintude: -47.2240132
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 5, 21, 8))

    await sut.execute({
      userId: 'any_user',
      gymId: 'any_gym',
      userLatitude: -22.8585935,
      userLogintude: -47.2240132
    })

    vi.setSystemTime(new Date(2023, 5, 22, 8))

    const { checkIn } = await sut.execute({
      userId: 'any_user',
      gymId: 'any_gym',
      userLatitude: -22.8585935,
      userLogintude: -47.2240132
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
