/* 
 -- Ne pas modifier --
 Exemple d'utilitaire permettant de se connecter au backend
*/
import axios from 'axios'
import { AUTH_URL, localStorageTokenKey } from '../config'

async function clientApiNetfilms(endpoint, data) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  return axios
    .post(`${AUTH_URL}/${endpoint}`, JSON.stringify(data), config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      if (error.response) {
        return Promise.reject(error.response.data)
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

function logout() {
  window.localStorage.removeItem(localStorageTokenKey)
}

export { getToken, login, register, logout, localStorageTokenKey }
