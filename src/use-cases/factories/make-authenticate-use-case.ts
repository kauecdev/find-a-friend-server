import { AuthenticateUseCase } from '../authenticate'
import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'

export function makeAuthenticateUseCase() {
  const ngosRepository = new PrismaNgosRepository()

  return new AuthenticateUseCase(ngosRepository)
}
