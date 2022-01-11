import { useEffect, useState } from 'react'
import './mocks'
import * as authNetfilms from './utils/authProvider'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AuthApp } from 'AuthApp'
import { UnauthApp } from 'UnauthApp'
import { useFetchData } from 'utils/hooks'
import { clientAuth } from './utils/clientApi'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

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

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E50914',
    },
    secondary: {
      main: '#E50914',
    },
  },
})

async function getUserByToken() {
  let user = null
  const token = await authNetfilms.getToken() //est récupéré depuis le localstorage
  if (token) {
    const data = await clientAuth('me', { token }) // /me: API d'authentification
    user = data.data.user
  }
  return user
}

function App() {
  const [authError, setAuthError] = useState(null)
  const {
    data: authUser,
    setData: setAuthUser,
    status,
    execute,
  } = useFetchData()

  const login = data => {
    authNetfilms
      .login(data)
      .then(user => {
        setAuthUser(user)
      })
      .catch(err => setAuthError(err))
  }

  const register = data =>
    authNetfilms
      .register(data)
      .then(user => setAuthUser(user))
      .catch(err => setAuthError(err))

  const logout = () => {
    authNetfilms.logout()
    queryClient.clear()
    setAuthUser(null)
  }

  useEffect(() => {
    execute(getUserByToken())
  }, [execute])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {status === 'fetching' ? (
          <Backdrop open={true}>
            <CircularProgress color='primary' />
          </Backdrop>
        ) : authUser ? (
          <AuthApp logout={logout} />
        ) : (
          <UnauthApp login={login} register={register} error={authError} />
        )}
      </ThemeProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export default App
