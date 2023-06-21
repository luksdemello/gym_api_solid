import { ResourceNotFoundError } from '@/errors/resource_not_found_error'
import { type UsersRepository } from '@/repositories/user/users_repository'
import { type User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}

export { GetUserProfileUseCase }
