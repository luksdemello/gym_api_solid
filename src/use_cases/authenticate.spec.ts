import { InMemoryUsersRepository } from '@/repositories/user/in_memory_users_repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from '@/errors/invalid_credential_error'
import { type UsersRepository } from '@/repositories/user/users_repository'

let usersRepository: UsersRepository
// system under test
let sut: AuthenticateUseCase

describe('Authenticate UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    // system under test
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'any_name',
      email: 'any_email',
      password_hash: await hash('any_password', 6)
    })

    const { user } = await sut.execute({
      email: 'any_email',
      password: 'any_password'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(async () => sut.execute({
      email: 'any_email',
      password: 'any_password'
    })).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'any_name',
      email: 'any_email',
      password_hash: await hash('any_password', 6)
    })

    expect(async () => sut.execute({
      email: 'any_email',
      password: 'wrong_password'
    })).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
