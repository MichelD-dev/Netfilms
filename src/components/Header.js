import { useState, forwardRef } from 'react'
import { HeaderSkeleton } from 'skeletons/HeaderSkeleton'
import { imagePathOriginal, TYPE_MOVIE } from '../config'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { clientNetfilms } from 'utils/clientApi'
import * as authNetfilms from '../utils/authProvider'
import DeleteIcon from '@mui/icons-material/Delete'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Header = ({ movie, type = TYPE_MOVIE, noBookmarks }) => {
  const queryClient = useQueryClient()
  const [mutateBookmarkError, setMutateBookmarkError] = useState('')
  const [bookmarkMessageOpen, setBookmarkMessageOpen] = useState(false)
  const [bookmarkCalled, setBookmarkCalled] = useState(false)
  const title = movie?.title ?? movie?.name
  const imageUrl = `${imagePathOriginal}${movie?.backdrop_path}`
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  }
  const { data } = useQuery('bookmark', async () => {
    const token = await authNetfilms.getToken()
    return clientNetfilms(`bookmark`, { token })
  })

  const addMutation = useMutation(
    async ({ type, id }) => {
      const token = await authNetfilms.getToken()
      return clientNetfilms(`bookmark/${type}`, {
        token,
        data: { id },
        method: 'POST',
      })
    },
    {
      onSuccess() {
        queryClient.invalidateQueries('bookmark')
        setBookmarkMessageOpen(true)
        setMutateBookmarkError()
      },
      onError(error) {
        setBookmarkMessageOpen(true)
        setMutateBookmarkError(error)
      },
    }
  )

  const deleteMutation = useMutation(
    async ({ type, id }) => {
      const token = await authNetfilms.getToken()
      return clientNetfilms(`bookmark/${type}`, {
        token,
        data: { id },
        method: 'DELETE',
      })
    },
    {
      onSuccess() {
        queryClient.invalidateQueries('bookmark')
        setBookmarkMessageOpen(true)
        setMutateBookmarkError('')
      },
      onError(error) {
        setBookmarkMessageOpen(true)
        setMutateBookmarkError(error)
      },
    }
  )

  const isInList = data?.bookmark[
    type === TYPE_MOVIE ? 'movies' : 'series'
  ]?.includes(movie?.id)

  const handleAddToBookmarks = () => {
    setBookmarkCalled()
    addMutation.mutate({ type, id: movie.id })
  }

  const handleDeleteFromBookmarks = () => {
    setBookmarkCalled()
    deleteMutation.mutate({ type, id: movie.id })
  }

  if (!movie) {
    return <HeaderSkeleton />
  }

  return (
    <header style={banner}>
      <div className='banner__contents'>
        <h1 className='banner__title'>{title ?? '...'}</h1>
        <div className='banner__buttons'>
          <button className='banner__button banner__buttonplay'>Lecture</button>
          {!isInList ? (
            <button
              onClick={handleAddToBookmarks}
              className='banner__button banner__buttonInfo'
            >
              Ajouter à ma liste
            </button>
          ) : (
            <button
              onClick={handleDeleteFromBookmarks}
              className='banner__button banner__buttonInfo'
            >
              <DeleteIcon
                color='secondary'
                style={{ marginRight: '5px' }}
                fontSize={'small'}
              />
              Supprimer de ma liste
            </button>
          )}
        </div>
        <h1 className='synopsis'>{movie?.overview ?? '...'}</h1>
      </div>
      <div className='banner--fadeBottom'></div>

      {!mutateBookmarkError && (
        <Snackbar
          open={bookmarkMessageOpen}
          autoHideDuration={4000}
          onClose={() => setBookmarkMessageOpen(false)}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Liste modifiée avec succès.
          </Alert>
        </Snackbar>
      )}

      {mutateBookmarkError && (
        <Snackbar
          open={bookmarkMessageOpen}
          autoHideDuration={4000}
          onClose={() => setBookmarkMessageOpen(false)}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            Problème lors de l'ajout : {mutateBookmarkError.message}.
          </Alert>
        </Snackbar>
      )}

      {noBookmarks && !bookmarkCalled && (
        <Snackbar
          open={bookmarkMessageOpen}
          autoHideDuration={4000}
          onClose={() => setBookmarkMessageOpen(false)}
        >
          <Alert severity='info' sx={{ width: '100%' }}>
            Vous n'avez pas de favoris enregistrés.
          </Alert>
        </Snackbar>
      )}
    </header>
  )
}

export { Header }
