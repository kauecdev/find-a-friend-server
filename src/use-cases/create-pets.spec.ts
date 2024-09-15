import type { NgosRepository } from '@/repositories/ngos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryNgosRepository } from '@/repositories/in-memory/in-memory-ngos-repository'
import type { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { ResourceNotFoundError } from './errors/resource-not-found'

let ngosRepository: NgosRepository
let petsRepository: PetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    ngosRepository = new InMemoryNgosRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository, ngosRepository)

    await ngosRepository.create({
      id: 'ngo-01',
      name: 'Save Pets',
      director_name: 'John Doe',
      email: 'save-pets@mail.com',
      password_hash: '123456',
      city: 'Teresina',
      state: 'PI',
      zip_code: '644400000',
      address: 'Rua 10, Centro, 1512',
      whatsapp_phone: '999999999',
    })
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      ngoId: 'ngo-01',
      name: 'Puppy',
      about: '',
      age: 'PUP',
      size: 'MEDIUM',
      energyLevel: 'MEDIUM',
      independencyLevel: 'MEDIUM',
      requirements: [],
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet in a non-existent ngo', async () => {
    await expect(() =>
      sut.execute({
        ngoId: 'non-existent-id',
        name: 'Puppy',
        about: '',
        age: 'PUP',
        size: 'MEDIUM',
        energyLevel: 'MEDIUM',
        independencyLevel: 'MEDIUM',
        requirements: [],
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
