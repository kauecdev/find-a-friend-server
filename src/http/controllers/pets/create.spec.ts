import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    await request(app.server).post('/ngos').send({
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'save-pets@mail.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const ngo = await prisma.ngo.findFirstOrThrow()

    const response = await request(app.server)
      .post(`/ngos/${ngo.id}/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Puppy',
        about: '',
        age: 'PUP',
        size: 'MEDIUM',
        energyLevel: 'MEDIUM',
        independencyLevel: 'MEDIUM',
        requirements: [],
      })

    expect(response.statusCode).toEqual(201)
  })
})
