export class MaxDistanceError extends Error {
  status: number

  constructor() {
    super('Max distance reached')
    this.status = 400
  }
}
