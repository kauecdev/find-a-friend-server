import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch a list of pets', async () => {
    await prisma.ngo.create({
      data: {
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
      },
    })

    await prisma.pet.create({
      data: {
        ngo_id: 'ngo-01',
        name: 'Puppy',
        about: '',
        age: 'PUP',
        size: 'MEDIUM',
        energy_level: 'MEDIUM',
        independency_level: 'MEDIUM',
      },
    })

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Teresina',
        state: 'PI',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Puppy',
      }),
    ])
  })
})
