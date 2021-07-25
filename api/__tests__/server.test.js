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
    expect(await db('users')).toHaveLength(4)
  })
  test('responds with [id, username, password] on successful register', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'kali',
      password: '1234'
    })
    expect(res.body).toMatchObject({user_id: 4, username: 'kali', message: 'Welcome, kali'})
  })
  test('responds with [Please provide username and password] if password is missing', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'kali'
    })
    expect(res.body.message).toBe('Please provide username and password')
  })
})

describe('[POST] /login', () => {
  test('responds with {message: welcome, [username], token} on successful login', async () => {
    const res = await request(server).post('/api/auth/login').send({
      username: 'Afie',
      password: '1234'
    })
    expect(res.body.message).toBe('welcome, Afie') 
    expect(res.body.token).toBeTruthy()
  })
  test('responds with [invalid credentials] message if incorrect username', async () => {
    await request(server).post('/api/auth/register').send({
      username: 'kali',
      password: '1234'
    }) 
    const res = await request(server).post('/api/auth/login').send({
      username: 'kal',
      password: '1234'
    })
    expect(res.body.message).toBe('invalid credentials')
  })
  test('responds with [username and password required] message if password is missing', async () => {
    const res = await request(server).post('/api/auth/login').send({
      username: 'kali'
    })
    expect(res.body.message).toBe('Please provide username and password')
  })
})
