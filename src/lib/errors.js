export class DuplicateError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'DuplicateError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DuplicateError)
    }
  }
}
