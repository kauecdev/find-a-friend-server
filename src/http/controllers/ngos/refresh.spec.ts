import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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

    const cookies = authResponse.get('Set-Cookie') as string[]

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
