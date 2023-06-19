import { UserAlreadyExistsError } from '@/errors/user_already_exists-error'
import { type UsersRepository } from '@/repositories/user/users_repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

class RegisterUseCase {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}

  async execute ({ name, email, password }: RegisterUseCaseRequest): Promise<void> {
    const password_hash = await hash(password, 6)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    this.usersRepository.create({ name, email, password_hash })
  }
}

export { RegisterUseCase }
