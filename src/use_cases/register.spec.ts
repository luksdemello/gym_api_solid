import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/user/in_memory_users_repository'
import { UserAlreadyExistsError } from '@/errors/user_already_exists_error'
import { type UsersRepository } from '@/repositories/user/users_repository'

let usersRepository: UsersRepository
let sut: RegisterUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const isPasswordCorrectlyHashed = await compare('any_password', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should be able to register an user', async () => {
    const { user } = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'any_email'

    await sut.execute({
      name: 'any_name',
      email,
      password: 'any_password'
    })

    expect(async () =>
      sut.execute({
        name: 'any_name',
        email,
        password: 'any_password'
      })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
