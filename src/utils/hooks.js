import { useReducer, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { clientApi, clientNetfilms } from './clientApi'
import * as authNetfilms from './authProvider'

//------------------------------------------------------------------------//
//--------------------------------HOOK USER-------------------------------//
//------------------------------------------------------------------------//

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return { status: 'fetching', data: null, error: null }
    case 'done':
      return { status: 'done', data: action.payload, error: null }
    case 'fail':
      return { status: 'error', data: null, error: action.error }
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
  const [state, dispatch] = useReducer(reducer, initialState)
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
  return data
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
  const { data } = useQuery('bookmark', async () => {
    const token = await authNetfilms.getToken()
    return clientNetfilms(`bookmark`, { token })
  })
  return data
}

const useAddBookmark = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
  onMutate = () => {},
}) => {
  const queryClient = useQueryClient()
  return useMutation(
    async ({ type, id }) => {
      const token = await authNetfilms.getToken()
      return clientNetfilms(`bookmark/${type}`, {
        token,
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
  const queryClient = useQueryClient()
  return useMutation(
    async ({ type, id }) => {
      const token = await authNetfilms.getToken()
      return clientNetfilms(`bookmark/${type}`, {
        token,
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
