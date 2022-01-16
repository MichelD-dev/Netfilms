import { rest } from 'msw'
import * as db from './db'
import { AUTH_URL } from '../config'

// eslint-disable-next-line no-unused-vars
const sleep = t => new Promise(resolve => setTimeout(resolve, t))

const handlers = [
  rest.post(`${AUTH_URL}/login`, async (req, res, ctx) => {
    const { username, password } = req.body
    // await sleep(3000)
    const user = await db.authenticate({ username, password })
    return res(ctx.json({ user }))
  }),

  rest.post(`${AUTH_URL}/register`, async (req, res, ctx) => {
    const { username, password } = req.body
    const userFields = { username, password }
    await db.createUser(userFields)
    let user
    try {
      user = await db.authenticate(userFields)
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
    const token = await getToken(req)
    return res(ctx.json({ user: { ...user, token } }))
  }),

  rest.get(`${AUTH_URL}/bookmark`, async (req, res, ctx) => {
    const user = await getUser(req)
    const uid = user.id
    const bookmark = await db.loadBookmarkByUid(uid)
    return res(ctx.json({ bookmark }))
  }),

  rest.post(`${AUTH_URL}/bookmark/tv`, async (req, res, ctx) => {
    const user = await getUser(req)
    const { id } = req.body
    const uid = user.id
    try {
      await db.addSerieToBookmark(id, uid)
    } catch (error) {
      return res(
        ctx.status(400),
        ctx.json({ status: 400, message: error.message })
      )
    }
    const bookmark = await db.loadBookmarkByUid(uid)
    return res(ctx.json({ bookmark }))
  }),
  rest.post(`${AUTH_URL}/bookmark/movie`, async (req, res, ctx) => {
    const user = await getUser(req)
    const { id } = req.body
    const uid = user.id
    try {
      await db.addMovieToBookmark(id, uid)
    } catch (error) {
      return res(
        ctx.status(400),
        ctx.json({ status: 400, message: error.message })
      )
    }
    const bookmark = await db.loadBookmarkByUid(uid)
    return res(ctx.json({ bookmark }))
  }),

  rest.delete(`${AUTH_URL}/bookmark/movie`, async (req, res, ctx) => {
    const user = await getUser(req)
    const { id } = req.body
    await db.deleteMovieToBookmark(id, user.id)
    const bookmark = await db.loadBookmarkByUid(id)
    return res(ctx.json({ bookmark }))
  }),
  rest.delete(`${AUTH_URL}/bookmark/tv`, async (req, res, ctx) => {
    const user = await getUser(req)
    const { id } = req.body
    await db.deleteSerieToBookmark(id, user.id)
    const bookmark = await db.loadBookmarkByUid(id)
    return res(ctx.json({ bookmark }))
  }),
  rest.post(`${AUTH_URL}/monitoring`, async (req, res, ctx) => {
    return res(ctx.json({ ok: 'ok' }))
  }),
]

const getToken = req => req.headers.get('Authorization')?.replace('Bearer ', '')

async function getUser(req) {
  const token = await getToken(req)
  if (!token) {
    const error = new Error('Le token est obligatoire')
    error.status = 401
    throw error
  }
  let userId
  try {
    userId = Buffer.from(token, 'base64').toString()
  } catch (e) {
    const error = new Error('Token invalide. Merci de se reconnecter.')
    error.status = 401
    throw error
  }
  const user = await db.loadUserById(userId, true)
  if (!user) {
    const error = new Error('Utilisateur non trouvé avec ce Token')
    error.status = 401
    throw error
  }
  return user
}

export { handlers }
