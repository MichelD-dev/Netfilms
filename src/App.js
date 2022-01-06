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

function App() {
  const [authError, setAuthError] = useState(null)
  const { data: authUser, setData, status, execute } = useFetchData()

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
    setData(null)
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

  useEffect(() => {
    // getUserByToken().then(user => setData(user))
    execute(getUserByToken()) //même résultat que la ligne au dessus !
  }, [execute])

  return (
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
  )
}

export default App
