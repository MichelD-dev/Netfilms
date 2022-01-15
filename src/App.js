import './mocks'
import { useAuth } from 'context/AuthContext'
import { AppProviders } from 'context'
import { lazy, Suspense } from 'react'
import LoadingFullScreen from 'components/LoadingFullScreen'
const AuthApp = lazy(() => import(/* webpackPrefetch: true */ 'AuthApp'))
const UnauthApp = lazy(() => import('UnauthApp'))

const AppConsumer = () => {
  const { authUser } = useAuth()
  return (
    <Suspense fallback={<LoadingFullScreen />}>
      {authUser ? <AuthApp /> : <UnauthApp />}
    </Suspense>
  )
}

function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

export default App
