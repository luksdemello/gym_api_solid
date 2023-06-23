import { type CheckInsRepository } from '@/repositories/checkin/checkins_repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

class GetUserMetricsUseCase {
  constructor(
    private readonly checkInsRepository: CheckInsRepository
  ) {}

  async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount
    }
  }
}

export { GetUserMetricsUseCase }
