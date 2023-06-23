import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from './checkin'
import { InMemoryCheckInsRepository } from '@/repositories/checkin/in_memory_checkins_repository'
import { type CheckInsRepository } from '@/repositories/checkin/checkins_repository'

let checkInRepository: CheckInsRepository
// system under test
let sut: CheckInUseCase

describe('Check In UseCase', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    // system under test
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should be able to  check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'any_user',
      gymId: 'any_gym'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
