/* fichier simulant un backend stockant des données
  ici nous sauvegarderons les données dans le localStorage
*/
import crypto from 'crypto'
const localStorageKey = 'netfilms-users'

function loadUsers() {
  const users = JSON.parse(window.localStorage.getItem(localStorageKey))
  return users ?? []
}

async function loadUserById(id, cleanFields = false) {
  const user = loadUsers().find(item => item.id === id)
  return cleanFields && user ? clean(user) : user
}

async function saveUser(user) {
  const users = loadUsers()
  users.push(user)
  saveUsers(users)
}

function saveUsers(users) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(users))
}

async function createUser({ username, password }) {
  validateUser({ username, password })
  const id = hashcode(username)
  const passwordHash = hashcode(password)
  const uid = await loadUserById(id)
  if (uid) {
    const error = new Error(
      `Impossible de créer un utilisateur car "${username}" existe déjà `
    )
    error.status = 400
    throw error
  }
  const user = { id, username, passwordHash }
  saveUser(user)
  return await loadUserById(id)
}

function validateUser({ username, password }) {
  if (!username) {
    const error = new Error("Le nom d'utilisateur est obligatoire")
    error.status = 400
    throw error
  }
  if (!password) {
    const error = new Error('Le mot de passe est obligatoire')
    error.status = 400
    throw error
  }
}

function hashcode(data) {
  return crypto.createHash('md5').update(data).digest('hex')
}

async function authenticate({ username, password }) {
  validateUser({ username, password })
  const id = hashcode(username)
  const user = (await loadUserById(id)) || {}
  if (user.passwordHash === hashcode(password)) {
    return { ...clean(user), token: Buffer.from(user.id).toString('base64') }
  }
  const error = new Error("Nom d'utilisateur ou mot de passe incorrect")
  error.status = 400
  throw error
}
function clean(user) {
  if (user.passwordHash) {
    const { passwordHash, ...rest } = user
    return rest
  }
}
async function updateUser(id, data) {
  validateUser(id)
  const user = await loadUserById(id)
  Object.assign(user, data)
  saveUser(user)
  return await loadUserById(id)
}
async function deleteUser(id) {
  validateUser(id)
  const user = await loadUserById(id)
  const users = await loadUsers()
  const updatedArray = users.filter(item => item.id !== user.id)
  saveUsers(updatedArray)
}

async function resetStorage() {
  const users = {}
  saveUser(users)
}

export {
  authenticate,
  createUser,
  loadUserById,
  updateUser,
  deleteUser,
  resetStorage,
}
