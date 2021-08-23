const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

let token = ''

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
  const res = await request(server)
    .post('/api/auth/login')
    .send({
    username: 'Afie',
    password: '1234'
  })
    token = res.body.token
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('[GET] /', () => {
    test('responds with 2 potlucks', async () => {
  
      const res = await request(server).get('/api/potlucks').set('Authorization', `${token}`)
      expect(res.body).toHaveLength(2)
    })
  })