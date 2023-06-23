import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/checkin/in_memory_checkins_repository'
import { type CheckInsRepository } from '@/repositories/checkin/checkins_repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch_user_check_ins_history'

let checkInRepository: CheckInsRepository
// system under test
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check Ins History UseCase', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    // system under test
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  it('should be able to fetch check ins history', async () => {
    await checkInRepository.create({
      gym_id: 'any_gym',
      user_id: 'any_user'
    })

    await checkInRepository.create({
      gym_id: 'another_gym',
      user_id: 'any_user'
    })

    const { checkIns } = await sut.execute({
      userId: 'any_user',
      page: 1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'any_gym' }),
      expect.objectContaining({ gym_id: 'another_gym' })
    ])
  })

  it('should be able to fetch paginated check ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'any_user'
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'any_user',
      page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' })
    ])
  })
})
