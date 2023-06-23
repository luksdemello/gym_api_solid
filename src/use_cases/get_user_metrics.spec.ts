import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/checkin/in_memory_checkins_repository'
import { type CheckInsRepository } from '@/repositories/checkin/checkins_repository'
import { GetUserMetricsUseCase } from './get_user_metrics'

let checkInRepository: CheckInsRepository
// system under test
let sut: GetUserMetricsUseCase

describe('Get User Metrics UseCase', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    // system under test
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get check ins count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'any_gym',
      user_id: 'any_user'
    })

    await checkInRepository.create({
      gym_id: 'another_gym',
      user_id: 'any_user'
    })

    const { checkInsCount } = await sut.execute({
      userId: 'any_user'
    })

    expect(checkInsCount).toEqual(2)
  })
})
