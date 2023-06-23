import { type GymsRepository } from '@/repositories/gym/gyms_repository'
import { type Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

class CreateGymUseCase {
  constructor(private readonly gymsRepositorty: GymsRepository) {}

  async execute({ title, description, phone, latitude, longitude }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepositorty.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return { gym }
  }
}

export { CreateGymUseCase }
