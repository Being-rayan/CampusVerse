export class ApiError extends Error {
  statusCode: number
  expose: boolean

  constructor(statusCode: number, message: string, expose = true) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.expose = expose
  }
}
