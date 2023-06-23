import { type GymsRepository } from '@/repositories/gym/gyms_repository'
import { type Gym } from '@prisma/client'

interface FeatchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FeatchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

class FeatchNearbyGymsUseCase {
  constructor(private readonly gymsRepositorty: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: FeatchNearbyGymsUseCaseRequest): Promise<FeatchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepositorty.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return { gyms }
  }
}

export { FeatchNearbyGymsUseCase }
