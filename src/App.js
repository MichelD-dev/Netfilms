import { NetfilmsApp } from 'components/NetfilmsApp'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'components/ErrorFallback'
import Error404 from './components/Error404'
import { Movies } from './components/Movies'
import { Series } from './components/Series'
import { News } from './components/News'
import { SelectById } from 'components/SelectById'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E50914',
    },
    secondary: {
      main: '#E50914',
    },
  },
})

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route path='/' exact strict element={<NetfilmsApp />} />
            <Route path='/tv/:tvId' exact strict element={<SelectById />} />
            <Route
              path='/movie/:movieId'
              exact
              strict
              element={<SelectById />}
            />
            <Route path='/series' exact strict element={<Series />} />
            <Route path='/movies' exact strict element={<Movies />} />
            <Route path='/news' exact strict element={<News />} />
            <Route path='/*' exact strict element={<Error404 />} />
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </Router>
  )
}

export default App
