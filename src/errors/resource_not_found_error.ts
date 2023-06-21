class ResourceNotFoundError extends Error {
  status: number

  constructor() {
    super('Resource not found')
    this.status = 400
  }
}

export { ResourceNotFoundError }
