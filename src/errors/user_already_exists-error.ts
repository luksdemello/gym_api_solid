class UserAlreadyExistsError extends Error {
  status: number

  constructor() {
    super('User email already exists')
    this.status = 409
  }
}

export { UserAlreadyExistsError }
