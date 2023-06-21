import { UserAlreadyExistsError } from '@/errors/user_already_exists_error'
import { type UsersRepository } from '@/repositories/user/users_repository'
import { type User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
interface RegisterUseCaseResponse {
  user: User
}

class RegisterUseCase {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}

  async execute ({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({ name, email, password_hash })

    return {
      user
    }
  }
}

export { RegisterUseCase }
