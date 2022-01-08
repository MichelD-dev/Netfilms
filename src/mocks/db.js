/* fichier simulant un backend stockant des données
  ici nous sauvegarderons les données dans le localStorage
*/
import crypto from 'crypto'
import { TYPE_TV, TYPE_MOVIE } from '../config'
const localStorageKey = 'db-back-netfilms-users'
const localStorageKeyList = 'db-back-netfilms-users-savedlist'

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
/**  Bookmark **/

function loadAllUsersBookmarks() {
  const all = JSON.parse(window.localStorage.getItem(localStorageKeyList))
  return all ?? []
}

async function saveUserBookmark(savedList) {
  let all = loadAllUsersBookmarks()
  console.log('saveUserBookmark', all)
  all = all.filter(item => item.uid !== savedList.uid)
  all.push(savedList)

  console.log('saveUserBookmark2', all)
  saveAllUsersBookmarks(all)
}

function saveAllUsersBookmarks(allUidList) {
  window.localStorage.setItem(localStorageKeyList, JSON.stringify(allUidList))
}
async function loadBookmarkByUid(uid) {
  //bookmark example => {uid: 1, movies: [1010, 1010, 5050],series:[6515,541]}
  const bookmark = loadAllUsersBookmarks().find(item => item.uid === uid)
  return bookmark ?? { uid, movies: [], series: [] }
}

async function addMovieToBookmark(movieId, uid) {
  await addToBookmark(movieId, uid, TYPE_MOVIE)
}

async function addSerieToBookmark(tvId, uid) {
  await addToBookmark(tvId, uid, TYPE_TV)
}
async function addToBookmark(ui, uid, type = TYPE_TV) {
  const bookmark = await loadBookmarkByUid(uid)
  await checkBookMark(ui, uid, type)
  if (type === TYPE_TV) {
    bookmark.series.push(ui)
  } else {
    bookmark.movies.push(ui)
  }
  saveUserBookmark(bookmark)
}

async function deleteMovieToBookmark(movieId, uid) {
  await deleteToBookmark(movieId, uid, TYPE_MOVIE)
}
async function deleteSerieToBookmark(tvId, uid) {
  await deleteToBookmark(tvId, uid, TYPE_TV)
}

async function deleteToBookmark(id, uid, type = TYPE_TV) {
  const bookmark = await loadBookmarkByUid(uid)
  if (type === TYPE_TV) {
    const series = bookmark.series.filter(item => item !== id)
    bookmark.series = series
    console.log('deleteToBookmark', series)
  } else {
    const movies = bookmark.movies.filter(item => item !== id)
    console.log('deleteToBookmark movies', movies)
    bookmark.movies = movies
  }
  saveUserBookmark(bookmark)
}

async function checkBookMark(id, uid, type = TYPE_TV) {
  const bookmark = await loadBookmarkByUid(uid)
  if (type === TYPE_TV) {
    const serie = bookmark.series.find(item => item === id)
    if (serie > 0) {
      const error = new Error('Serie déjà dans la liste')
      error.status = 400
      throw error
    }
  } else {
    const movie = bookmark.movies.find(item => item === id)
    if (movie) {
      const error = new Error('Film déjà dans la liste')
      error.status = 400
      throw error
    }
  }
}

export {
  addMovieToBookmark,
  addSerieToBookmark,
  loadBookmarkByUid,
  deleteMovieToBookmark,
  deleteSerieToBookmark,
  authenticate,
  createUser,
  loadUserById,
  updateUser,
  deleteUser,
  resetStorage,
}
