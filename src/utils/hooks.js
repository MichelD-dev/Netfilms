import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { clientApi } from './clientApi'
import { useClientNetfilms } from 'context/AuthContext'
import { useImmerReducer } from 'use-immer'

//------------------------------------------------------------------------//
//--------------------------------HOOK USER-------------------------------//
//------------------------------------------------------------------------//

const reducer = (draft, action) => {
  switch (action.type) {
    case 'fetching':
      draft.status = 'fetching'
      return
    case 'done':
      draft.status = 'done'
      draft.data = action.payload
      return
    case 'fail':
      draft.status = 'error'
      draft.error = action.error
      return
    default:
      throw new Error(`L'action ${action.type} n'est pas supportée.`)
  }
}

const initialState = {
  data: null,
  error: null,
  status: 'idle',
}

export function useFetchData() {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const { data, error, status } = state

  const execute = useCallback(promise => {
    dispatch({ type: 'fetching' })
    promise
      .then(response => dispatch({ type: 'done', payload: response }))
      .catch(error => dispatch({ type: 'fail', error }))
  }, [])

  const setData = useCallback(
    data => dispatch({ type: 'done', payload: data }),
    [dispatch]
  )

  return { data, error, status, execute, setData, dispatch }
}

//------------------------------------------------------------------------//
//------------------------------HOOKS MOVIES------------------------------//
//------------------------------------------------------------------------//

const useSearchMovie = query => {
  const { data } = useQuery(`search/multi?query=${query}`, () =>
    clientApi(`search/multi?query=${query}`)
  )
  return data?.data?.results ?? []
}

const useMovie = (type, id) => {
  const { data } = useQuery(`${type}/${id}`, () => clientApi(`${type}/${id}`))
  return data?.data
}

const useMovieFilter = (type, filter, param) => {
  const endpointLatest = `${type}/upcoming`
  const endpointPopular = `${type}/popular`
  const endpointTopRated = `${type}/top_rated`
  const endpointGenre = `discover/${type}?with_genres=${param}`
  const endpointTrending = `trending/${type}/day`

  let endpoint
  switch (filter) {
    case 'populaire':
      endpoint = endpointPopular
      break
    case 'latest':
      endpoint = endpointLatest
      break
    case 'toprated':
      endpoint = endpointTopRated
      break
    case 'genre':
      endpoint = endpointGenre
      break
    case 'trending':
      endpoint = endpointTrending
      break
    default:
      throw new Error('Type non supporté')
  }

  const { data } = useQuery(`${endpoint}`, () => clientApi(`${endpoint}`))
  return data?.data?.results ?? []
}

const useBookmark = () => {
  const clientNetfilms = useClientNetfilms()
  const { data } = useQuery('bookmark', () => clientNetfilms(`bookmark`))
  return data
}

const useAddBookmark = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
  onMutate = () => {},
}) => {
  const clientNetfilms = useClientNetfilms()
  const queryClient = useQueryClient()

  return useMutation(
    ({ type, id }) => {
      return clientNetfilms(`bookmark/${type}`, {
        data: { id },
        method: 'POST',
      })
    },
    {
      onSuccess(data) {
        queryClient.invalidateQueries('bookmark')
        onSuccess(data)
      },
      onError(error) {
        onError(error)
      },
      onSettled(data) {
        onSettled(data)
      },
      onMutate(data) {
        onMutate(data)
      },
    }
  )
}

const useDeleteBookmark = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
  onMutate = () => {},
}) => {
  const clientNetfilms = useClientNetfilms()
  const queryClient = useQueryClient()
  return useMutation(
    ({ type, id }) => {
      return clientNetfilms(`bookmark/${type}`, {
        data: { id },
        method: 'DELETE',
      })
    },
    {
      onSuccess(data) {
        queryClient.invalidateQueries('bookmark')
        onSuccess(data)
      },
      onError(error) {
        onError(error)
      },
      onSettled(data) {
        onSettled(data)
      },
      onMutate(data) {
        onMutate(data)
      },
    }
  )
}

export {
  useMovie,
  useMovieFilter,
  useBookmark,
  useAddBookmark,
  useDeleteBookmark,
  useSearchMovie,
}
