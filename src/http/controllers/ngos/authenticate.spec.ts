import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'save-pets@mail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
