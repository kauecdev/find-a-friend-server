export class NgoAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already exists.")
  }
}