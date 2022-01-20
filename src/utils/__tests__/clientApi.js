import { clientAuth, clientNetfilms } from 'utils/clientApi'
import { server, rest } from 'mocks'
import { AUTH_URL } from '../../config'
import * as authNetfilms from '../../utils/authProvider'

jest.mock('utils/authProvider')

test('faire une requette HTTP GET vers un endpoint', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = { mockResult: 'TEST' }

  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(resultRequest))
    })
  )
  const result = await clientAuth(endpoint)

  expect(result.data).toEqual(resultRequest)
})

test('Verifier les data passées en paramêtres', async () => {
  const data = { data: 'fake data' }
  const endpoint = 'fake-endpoint'
  const resultRequest = { mockResult: 'TEST' }

  let request
  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    })
  )
  await clientAuth(endpoint, { data })

  expect(data).toEqual(request.body)
})

test('Verifier le token  passé en parameters', async () => {
  const token = 'faketoken'
  const endpoint = 'fake-endpoint'
  const resultRequest = { mockResult: 'TEST' }

  let request
  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req.headers.get('Authorization')
      return res(ctx.json(resultRequest))
    })
  )
  await clientAuth(endpoint, { token })

  expect(request).toBe(`Bearer ${token}`)
})

test('Verifier le couple token/data passé en parameters', async () => {
  const data = { data: 'fakedata' }
  const token = 'faketoken'
  const endpoint = 'fake-endpoint'
  const resultRequest = { mockResult: 'TEST' }
  let request
  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    })
  )
  await clientAuth(endpoint, { token, data })
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
  expect(data).toEqual(request.body)
})

test("Vérifier le message d'erreur sur 401", async () => {
  const endpoint = 'fake-endpoint'
  const data = { data: 'fakedata' }
  const token = 'faketoken'
  const resultRequest = { mockResult: 'TEST' }
  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(resultRequest))
    })
  )
  const error = await clientNetfilms(endpoint, {
    token,
    data,
    method: 'POST',
  }).catch(error => error)

  expect(error.message).toMatchInlineSnapshot(`"Authentification incorrecte"`)
  expect(authNetfilms.logout).toHaveBeenCalledTimes(1)
})

test("Vérifier le message d'erreur sur 400", async () => {
  const endpoint = 'fake-endpoint'
  const resultError = { message: 'fake-error' }
  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(resultError))
    })
  )
  await expect(clientNetfilms(endpoint)).rejects.toEqual(resultError)
})
