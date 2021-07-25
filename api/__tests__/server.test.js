const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[POST] /register', () => {
  test('creates new user in db', async () => {
    await request(server).post('/api/auth/register').send({
      username: 'kali',
      password: '1234'
    })
    expect(await db('users')).toHaveLength(1)
  })
  test('responds with [id, username, password] on successful register', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'kali',
      password: '1234'
    })
    expect(res.body).toMatchObject({user_id: 1, username: 'kali', message: 'Welcome, kali'})
  })
  test('responds with [Please provide username and password] if password is missing', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'kali'
    })
    expect(res.body.message).toBe('Please provide username and password')
  })
})
