import './mocks'
import { AuthApp } from 'AuthApp'
import { UnauthApp } from 'UnauthApp'
import { useAuth } from 'context/AuthContext'
import { AppProviders } from 'context'

const AppConsumer = () => {
  const { authUser } = useAuth()
  return authUser ? <AuthApp /> : <UnauthApp />
}

function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

export default App
