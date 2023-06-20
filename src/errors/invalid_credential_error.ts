class InvalidCredentialError extends Error {
  status: number

  constructor() {
    super('Invalid credential')
    this.status = 400
  }
}

export { InvalidCredentialError }
