import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryNgosRepository } from '@/repositories/in-memory/in-memory-ngos-repository'

let ngosRepository: InMemoryNgosRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    ngosRepository = new InMemoryNgosRepository()
    sut = new AuthenticateUseCase(ngosRepository)

    await ngosRepository.create({
      name: 'Save Pets',
      director_name: 'John Doe',
      email: 'save-pets@mail.com',
      password_hash: await hash('123456', 6),
      city: 'Teresina',
      state: 'PI',
      zip_code: '644400000',
      address: 'Rua 10, Centro, 1512',
      whatsapp_phone: '999999999',
    })
  })

  it('should be able to authenticate', async () => {
    const { ngo } = await sut.execute({
      email: 'save-pets@mail.com',
      password: '123456',
    })

    expect(ngo.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'non-existing@mail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'save-pets@mail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
