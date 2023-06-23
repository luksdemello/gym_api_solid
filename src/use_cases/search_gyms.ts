import { type GymsRepository } from '@/repositories/gym/gyms_repository'
import { type Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

class SearchGymsUseCase {
  constructor(private readonly gymsRepositorty: GymsRepository) {}

  async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepositorty.findMany(query, page)

    return { gyms }
  }
}

export { SearchGymsUseCase }
