import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Ngo (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a ngo', async () => {
    const response = await request(app.server).post('/ngos').send({
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

    expect(response.statusCode).toEqual(201)
  })
})
