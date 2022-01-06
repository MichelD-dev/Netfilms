import { rest } from 'msw'
import * as users from './db'
import { AUTH_URL } from '../config'

// eslint-disable-next-line no-unused-vars
const sleep = t => new Promise(resolve => setTimeout(resolve, t))

const handlers = [
  rest.post(`${AUTH_URL}/login`, async (req, res, ctx) => {
    const { username, password } = req.body
    // await sleep(3000)
    const user = await users.authenticate({ username, password })
    return res(ctx.json({ user }))
  }),

  rest.post(`${AUTH_URL}/register`, async (req, res, ctx) => {
    const { username, password } = req.body
    const userFields = { username, password }
    await users.createUser(userFields)
    let user
    try {
      user = await users.authenticate(userFields)
    } catch (error) {
      return res(
        ctx.status(400),
        ctx.json({ status: 400, message: error.message })
      )
    }
    return res(ctx.json({ user }))
  }),

  rest.get(`${AUTH_URL}/me`, async (req, res, ctx) => {
    const user = await getUser(req)
    const token = getToken(req)
    return res(ctx.json({ user: { ...user, token } }))
  }),
]

const getToken = req => req.headers.get('Authorization')?.replace('Bearer ', '')

async function getUser(req) {
  const token = getToken(req)
  if (!token) {
    const error = new Error('Le Token est obligatoire')
    error.status = 401
    throw error
  }
  let userId
  try {
    userId = Buffer.from(token, 'base64').toString()
  } catch (e) {
    const error = new Error('token Invalid. Merci de se reconnecter.')
    error.status = 401
    throw error
  }
  const user = await users.loadUserById(userId, true)
  return user
}

export { handlers }
