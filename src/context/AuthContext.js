import { useEffect, useState, createContext, useContext } from 'react'
import * as authNetfilms from 'utils/authProvider'
import { clientAuth, clientNetfilms } from 'utils/clientApi'
import { useFetchData } from 'utils/hooks'
import { QueryClient } from 'react-query'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const AuthContext = createContext()

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined)
    throw new Error("useAuth doit s'utiliser avec AuthContext.Provider")
  return context
}

async function getUserByToken() {
  let user = null
  const token = await authNetfilms.getToken() //est récupéré depuis le localstorage
  if (token) {
    const data = await clientAuth('me', { token }) // /me: API d'authentification
    user = data.data.user
  }
  return user
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retryDelay: 500,
      retry: (failureCount, error) => {
        if (error.status === 404) return false
        else if (error.status === 401) return false
        else if (failureCount > 3) return false
        else return true
      },
    },
    mutations: {
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
      retryDelay: 500,
      retry: 1,
    },
  },
})

const AuthProvider = props => {
  const { data: authUser, status, execute, setData } = useFetchData()
  useEffect(() => {
    execute(getUserByToken())
  }, [execute])

  const [authError, setAuthError] = useState()
  const login = data =>
    authNetfilms
      .login(data)
      .then(user => setData(user))
      .catch(err => setAuthError(err))
  const register = data =>
    authNetfilms
      .register(data)
      .then(user => setData(user))
      .catch(err => setAuthError(err))
  const logout = () => {
    authNetfilms.logout()
    queryClient.clear() //FIXME vidage cache
    setData(null)
  }

  const value = { authUser, login, register, logout, authError }

  if (status === 'fetching' || status === 'idle')
    return (
      <Backdrop open={true}>
        <CircularProgress color='primary' />
      </Backdrop>
    )

  if (status === 'done')
    return <AuthContext.Provider value={value} {...props} />

  throw new Error('Statut invalide')
}

const useClientNetfilms = () => {
  const {
    authUser: { token },
  } = useAuth()
  return (endpoint, data) => clientNetfilms(endpoint, { ...data, token })
}

export { AuthContext, useAuth, AuthProvider, useClientNetfilms }
