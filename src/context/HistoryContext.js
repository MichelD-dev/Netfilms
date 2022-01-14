import { createContext, useContext, useEffect, useReducer } from 'react'
import { TYPE_MOVIE, TYPE_TV } from 'config'

const HistoryContext = createContext()

const MAX_ELEMENTS = 4

const reducer = (state, action) => ({ ...state, ...action })

const HistoryContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { movies: [], series: [] })

  const addMovie = movie =>
    dispatch({ movies: [...state.movies, movie].slice(0, MAX_ELEMENTS - 1) })
  const addSerie = serie =>
    dispatch({ series: [...state.series, serie].slice(0, MAX_ELEMENTS - 1) })
  const clearHistory = () => dispatch({ movies: [], series: [] })

  const { series, movies } = state
  const value = { movies, series, addMovie, addSerie, clearHistory }

  return <HistoryContext.Provider value={value} {...props} />
}

const useHistory = () => {
  const context = useContext(HistoryContext)
  if (context === undefined)
    throw new Error("useHistory doit s'utiliser avec HistoryContext.Provider")
  return context
}

const useAddToHistory = (movie, type = TYPE_TV) => {
  const { movies, series, addMovie, addSerie } = useHistory()

  useEffect(() => {
    if (movie === undefined) return
    type === TYPE_TV && !series.includes(movie) && addSerie(movie)
    type === TYPE_MOVIE && !movies.includes(movie) && addMovie(movie)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie])
}

const useClearHistory = () => {
  const { clearHistory } = useHistory()
  return clearHistory
}

export { HistoryContextProvider, useHistory, useAddToHistory, useClearHistory }
