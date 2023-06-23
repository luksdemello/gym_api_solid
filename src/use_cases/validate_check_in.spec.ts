import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/checkin/in_memory_checkins_repository'
import { ValidateCheckInUsecase } from './validate_check_in'
import { ResourceNotFoundError } from '@/errors/resource_not_found_error'
import { LateCheckInValidationError } from '@/errors/late_check_in_validation_error'

let checkInRepository: InMemoryCheckInsRepository
// system under test
let sut: ValidateCheckInUsecase

describe('Validate Check In UseCase', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    // system under test
    sut = new ValidateCheckInUsecase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check in', async () => {
    const createadCheckIn = await checkInRepository.create({
      gym_id: 'any_gym',
      user_id: 'any_user'
    })

    const { checkIn } = await sut.execute({
      checkInId: createadCheckIn.id
    })

    expect(checkIn.is_validated).toEqual(expect.any(Date))
    expect(checkInRepository.checkIns[0].is_validated).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(async () => sut.execute({
      checkInId: 'any_id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate to check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createadCheckIn = await checkInRepository.create({
      gym_id: 'any_gym',
      user_id: 'any_user'
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(async () => sut.execute({
      checkInId: createadCheckIn.id
    })).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
