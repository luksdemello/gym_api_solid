class LateCheckInValidationError extends Error {
  status: number

  constructor() {
    super('The check-in can only be validate until 20 minutes of its creation')
    this.status = 400
  }
}

export { LateCheckInValidationError }
