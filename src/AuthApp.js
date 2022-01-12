import { Accueil } from 'pages/Accueil'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'components/ErrorFallback'
import Error404 from './components/Error404'
import { Movies } from './pages/Movies'
import { Series } from './pages/Series'
import { News } from './pages/News'
import { Bookmarks } from './pages/Bookmarks'
import { SelectById } from 'pages/SelectById'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Search } from 'components/Search'
import { useAuth } from 'context/AuthContext'

function AuthApp() {
  const { logout } = useAuth()

  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path='/' element={<Accueil logout={logout} />} />
          <Route path='/tv/:tvId' element={<SelectById logout={logout} />} />
          <Route
            path='/movie/:movieId'
            element={<SelectById logout={logout} />}
          />
          <Route path='/movies' element={<Movies logout={logout} />} />
          <Route path='/series' element={<Series logout={logout} />} />
          <Route path='/news' element={<News logout={logout} />} />
          <Route path='/list' element={<Bookmarks logout={logout} />} />
          <Route path='*' element={<Error404 />} />
          <Route path='/search/:query' element={<Search logout={logout} />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export { AuthApp }
