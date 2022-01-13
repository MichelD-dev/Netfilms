import { createContext, useCallback, useContext, useReducer } from 'react'

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

export { HistoryContextProvider, useHistory }
