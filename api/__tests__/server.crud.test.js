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

describe('[POST] /', () => {
    test('responds with newly created potluck', async () => {
      const res = await request(server).post(`/api/potlucks`).send({potluck_name: "potluck party", potluck_time: "08:00:00", potluck_location: "1234 Main St", potluck_date: "06/12/21"}).set('Authorization', `${token}`)
      expect(res.body).toMatchObject({potluck_name: "potluck party", potluck_time:"08:00:00", potluck_location: "1234 Main St"})
      expect(res.body.message).toBeFalsy
    })
    test('responds with error message if potluck_name is not provided', async () => {
      const res = await request(server).post(`/api/potlucks`).send({ potluck_time: "08:00:00", potluck_location: "1234 Main St", potluck_date: "06/12/21"}).set('Authorization', `${token}`)
      expect(res.body.message).toBe("Potluck name required")
    })
  })