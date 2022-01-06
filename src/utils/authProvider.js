/* 
 -- Ne pas modifier --
 Exemple d'utilitaire permettant de se connecter au backend
*/
import { AUTH_URL, localStorageTokenKey } from '../config'

async function clientApiNetfilms(endpoint, data) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }

  return fetch(`${AUTH_URL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.log('clientApiNetfilms ko', data)
      return Promise.reject(data)
    }
  })
}

async function getToken() {
  return window.localStorage.getItem(localStorageTokenKey)
}

function storeToken({ user }) {
  window.localStorage.setItem(localStorageTokenKey, user.token)
  return user
}

async function login({ username, password }) {
  return clientApiNetfilms('login', { username, password }).then(storeToken)
}

async function register({ username, password }) {
  return clientApiNetfilms('register', { username, password }).then(storeToken)
}

async function logout() {
  window.localStorage.removeItem(localStorageTokenKey)
}

export { getToken, login, register, logout, localStorageTokenKey }
