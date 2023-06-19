import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/user/in_memory_users_repository'
import { UserAlreadyExistsError } from '@/errors/user_already_exists-error'

describe('Register User Use Case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const isPasswordCorrectlyHashed = await compare('any_password', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should be able to register an user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'any_email'

    await registerUseCase.execute({
      name: 'any_name',
      email,
      password: 'any_password'
    })

    expect(async () =>
      registerUseCase.execute({
        name: 'any_name',
        email,
        password: 'any_password'
      })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
