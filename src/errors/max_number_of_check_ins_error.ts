export class MaxNumberOfCheckInsError extends Error {
  status: number

  constructor() {
    super('Max number of check ins')
    this.status = 400
  }
}
