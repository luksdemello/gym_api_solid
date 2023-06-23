import { type CheckInsRepository } from '@/repositories/checkin/checkins_repository'
import { type Checkin } from '@prisma/client'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: Checkin[]
}

class FetchUserCheckInsHistoryUseCase {
  constructor(
    private readonly checkInsRepository: CheckInsRepository
  ) {}

  async execute({ userId, page }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }
  }
}

export { FetchUserCheckInsHistoryUseCase }
