import { InMemoryUsersRepository } from '@/repositories/user/in_memory_users_repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { type UsersRepository } from '@/repositories/user/users_repository'
import { GetUserProfileUseCase } from './get_user_profile'
import { ResourceNotFoundError } from '@/errors/resource_not_found_error'

let usersRepository: UsersRepository
// system under test
let sut: GetUserProfileUseCase

describe('Get User Profile UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    // system under test
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'any_name',
      email: 'any_email',
      password_hash: await hash('any_password', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('any_name')
  })

  it('should not be able to get user profile with wrong id', () => {
    expect(async () => await sut.execute({
      userId: 'any_id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
