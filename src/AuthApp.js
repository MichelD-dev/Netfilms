import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'components/ErrorFallback'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import LoadingFullScreen from 'components/LoadingFullScreen'

function AuthApp() {
  const { logout } = useAuth()

  const Accueil = lazy(() => import('./pages/Accueil'))
  const Movies = lazy(() => import('./pages/Movies'))
  const Series = lazy(() => import('./pages/Series'))
  const News = lazy(() => import('./pages/News'))
  const Bookmarks = lazy(() => import('./pages/Bookmarks'))
  const Error404 = lazy(() => import('./components/Error404'))
  const Search = lazy(() => import('./components/Search'))
  const SelectById = lazy(() =>
    import(/* webpackPrefetch: true */ './pages/SelectById')
  )

  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFullScreen />}>
          <Routes>
            <Route path='/' element={<Accueil />} logout={logout} />
            <Route path='/tv/:tvId' element={<SelectById />} logout={logout} />
            <Route
              path='/movie/:movieId'
              element={<SelectById />}
              logout={logout}
            />
            <Route path='/movies' element={<Movies />} logout={logout} />
            <Route path='/series' element={<Series />} logout={logout} />
            <Route path='/news' element={<News />} logout={logout} />
            <Route path='/list' element={<Bookmarks />} logout={logout} />
            <Route path='*' element={<Error404 />} />
            <Route path='/search/:query' element={<Search />} logout={logout} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  )
}

export default AuthApp
