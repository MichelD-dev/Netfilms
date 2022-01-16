import { TYPE_TV, TYPE_MOVIE } from '../../config'
import {
  getRandomIntInclusive,
  getRandomType,
  getRandomMovie,
  getRandomSerie,
  getRandomId,
} from '../helpers'

test('Retourne un nombre entier aléatoire', () => {
  const min = 0
  const max = 10
  expect(getRandomIntInclusive(min, max)).toBeGreaterThanOrEqual(min)
  expect(getRandomIntInclusive(min, max)).toBeLessThanOrEqual(max)
})

test('Retourne un type aléatoire', () => {
  expect([TYPE_TV, TYPE_MOVIE]).toContain(getRandomType())
})

test('Retourne un film aléatoire', () => {
  const moviesIds = [399566, 602734, 579047, 385128, 615658]
  expect(moviesIds).toContain(getRandomMovie())
})

test('Retourne une série aléatoire', () => {
  const tvIds = [71446, 60574, 1399, 66732]
  expect(tvIds).toContain(getRandomSerie())
})

test('Retourne un id aléatoire', () => {
  const moviesIds = [399566, 602734, 579047, 385128, 615658]
  const tvIds = [71446, 60574, 1399, 66732]
  expect(moviesIds).toContain(getRandomId(TYPE_MOVIE))
  expect(tvIds).toContain(getRandomId(TYPE_TV))
})
