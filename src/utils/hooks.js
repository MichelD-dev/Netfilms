import * as React from 'react'

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
function useFetchData() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { data, error, status } = state

  const execute = React.useCallback(promise => {
    dispatch({ type: 'fetching' })
    promise
      .then(response => dispatch({ type: 'done', payload: response }))
      .catch(error => dispatch({ type: 'fail', error }))
  }, [])

  const setData = React.useCallback(
    data => dispatch({ type: 'done', payload: data }),
    [dispatch]
  )

  return { data, error, status, execute, setData }
}

export { useFetchData }
