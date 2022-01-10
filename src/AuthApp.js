import { NetfilmsApp } from 'components/NetfilmsApp'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'components/ErrorFallback'
import Error404 from './components/Error404'
import { Movies } from './components/Movies'
import { Series } from './components/Series'
import { News } from './components/News'
import { Bookmarks } from './components/Bookmarks' //FIXME
import { SelectById } from 'components/SelectById'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function AuthApp({ logout }) {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path='/' element={<NetfilmsApp logout={logout} />} />
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
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export { AuthApp }
