import type { NgosRepository } from '@/repositories/ngos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryNgosRepository } from '@/repositories/in-memory/in-memory-ngos-repository'
import type { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsUseCase } from './fetch-pets'

let ngosRepository: NgosRepository
let petsRepository: PetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(async () => {
    ngosRepository = new InMemoryNgosRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository, ngosRepository)

    await ngosRepository.create({
      id: 'ngo-01',
      name: 'Save Pets - Teresina',
      director_name: 'John Doe',
      email: 'save-pets-the@mail.com',
      password_hash: '123456',
      city: 'Teresina',
      state: 'PI',
      zip_code: '644400000',
      address: 'Rua 10, Centro, 1512',
      whatsapp_phone: '999999999',
    })

    await ngosRepository.create({
      id: 'ngo-02',
      name: 'Save Pets - Fortaleza',
      director_name: 'Jane Doe',
      email: 'save-pets-for@mail.com',
      password_hash: '123456',
      city: 'Fortaleza',
      state: 'CE',
      zip_code: '613400000',
      address: 'Rua 01, Matinha, 1422',
      whatsapp_phone: '999999999',
    })

    await petsRepository.create({
      id: 'pet-01',
      ngo_id: 'ngo-01',
      name: 'Puppy',
      about: '',
      age: 'PUP',
      size: 'MEDIUM',
      energy_level: 'MEDIUM',
      independency_level: 'MEDIUM',
    })

    await petsRepository.create({
      id: 'pet-02',
      ngo_id: 'ngo-01',
      name: 'Zinc',
      about: '',
      age: 'ELDERLY',
      size: 'SMALL',
      energy_level: 'LOW',
      independency_level: 'LOW',
    })

    await petsRepository.create({
      id: 'pet-03',
      ngo_id: 'ngo-02',
      name: 'Zoe',
      about: '',
      age: 'ADULT',
      size: 'LARGE',
      energy_level: 'HIGH',
      independency_level: 'HIGH',
    })

    await petsRepository.create({
      id: 'pet-04',
      ngo_id: 'ngo-02',
      name: 'Cloe',
      about: '',
      age: 'ELDERLY',
      size: 'SMALL',
      energy_level: 'LOW',
      independency_level: 'LOW',
    })
  })

  it('should be able to fetch pets', async () => {
    const { pets } = await sut.execute({
      city: 'Teresina',
      state: 'PI',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        id: 'pet-01',
      }),
      expect.objectContaining({
        id: 'pet-02',
      }),
    ])
  })

  it('should be able to fetch only small pets', async () => {
    const { pets } = await sut.execute({
      city: 'Fortaleza',
      state: 'CE',
      size: 'SMALL',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        id: 'pet-04',
      }),
    ])
  })
})
