import type { Ngo } from '@prisma/client'
import { compare } from 'bcryptjs'
import type { NgosRepository } from '@/repositories/ngos-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  ngo: Ngo
}

export class AuthenticateUseCase {
  constructor(private ngosRepository: NgosRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const ngo = await this.ngosRepository.findByEmail(email)

    if (!ngo) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, ngo.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { ngo }
  }
}
