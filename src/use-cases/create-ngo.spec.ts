import type { NgosRepository } from '@/repositories/ngos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateNgoUseCase } from './create-ngo'
import { InMemoryNgosRepository } from '@/repositories/in-memory/in-memory-ngos-repository'
import { NgoAlreadyExistsError } from './errors/ngo-already-exists-error'

let ngosRepository: NgosRepository
let sut: CreateNgoUseCase

describe('Create Ngo Use Case', () => {
  beforeEach(() => {
    ngosRepository = new InMemoryNgosRepository()
    sut = new CreateNgoUseCase(ngosRepository)
  })

  it('should be able to create a ngo', async () => {
    const { ngo } = await sut.execute({
      name: 'Save Pets',
      directorName: 'John Doe',
      email: 'save-pets@mail.com',
      password: '123456',
      city: 'Teresina',
      state: 'PI',
      zipCode: '644400000',
      address: 'Rua 10, Centro, 1512',
      whatsappPhone: '999999999',
    })

    expect(ngo.id).toEqual(expect.any(String))
  })

  it('should not be able to create a ngo with same email twice', async () => {
    const email = 'save-pets@mail.com'

    await sut.execute({
      name: 'Save Pets',
      directorName: 'John Doe',
      email,
      password: '123456',
      city: 'Teresina',
      state: 'PI',
      zipCode: '644400000',
      address: 'Rua 10, Centro, 1512',
      whatsappPhone: '999999999',
    })

    await expect(() =>
      sut.execute({
        name: 'Save Pets',
        directorName: 'John Doe',
        email,
        password: '123456',
        city: 'Teresina',
        state: 'PI',
        zipCode: '644400000',
        address: 'Rua 10, Centro, 1512',
        whatsappPhone: '999999999',
      })
    ).rejects.toBeInstanceOf(NgoAlreadyExistsError)
  })
})
