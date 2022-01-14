import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { TYPE_MOVIE, TYPE_TV } from 'config'

const HistoryContext = createContext()

const MAX_ELEMENTS = 4

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [...state.movies, action.movie].slice(0, MAX_ELEMENTS - 1),
      }
    case 'ADD_SERIE':
      return {
        ...state,
        series: [...state.series, action.serie].slice(0, MAX_ELEMENTS - 1),
      }
    default:
      throw new Error(`L'action ${action.type} n'est pas reconnue`)
  }
}

const HistoryContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { movies: [], series: [] })

  const addMovie = useCallback(
    movie => dispatch({ type: 'ADD_MOVIE', movie }),
    []
  )
  const addSerie = useCallback(
    serie => dispatch({ type: 'ADD_SERIE', serie }),
    []
  )

  const { series, movies } = state
  const value = { movies, series, addMovie, addSerie }

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

export { HistoryContextProvider, useHistory, useAddToHistory }
