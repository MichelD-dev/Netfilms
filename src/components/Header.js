import { useEffect, useState, forwardRef } from 'react'
import { HeaderSkeleton } from 'skeletons/HeaderSkeleton'
import { imagePathOriginal, TYPE_MOVIE } from '../config'
import { useFetchData } from 'utils/hooks'
import { clientNetfilms } from 'utils/clientApi'
import * as authNetfilms from '../utils/authProvider'
import DeleteIcon from '@mui/icons-material/Delete'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Header = ({ movie, type = TYPE_MOVIE }) => {
  const [bookmarkMessageOpen, setBookmarkMessageOpen] = useState(false)
  const [bookmarkCalled, setBookmarkCalled] = useState(false)
  const { data, error, status, execute } = useFetchData()
  const title = type === TYPE_MOVIE ? movie?.title : movie?.name
  const imageUrl = `${imagePathOriginal}${movie?.backdrop_path}`
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  }

  useEffect(() => {
    setBookmarkMessageOpen(true)
  }, [status])

  useEffect(() => {
    const getBookmarks = async () => {
      const token = await authNetfilms.getToken()
      execute(clientNetfilms('bookmark', { token }))
    }
    getBookmarks()
  }, [execute])

  const isInList = data?.bookmark[
    type === TYPE_MOVIE ? 'movies' : 'series'
  ]?.includes(movie?.id)

  const handleAddToListClick = async () => {
    setBookmarkCalled(true)
    const token = await authNetfilms.getToken()
    execute(
      clientNetfilms(`bookmark/${type}`, {
        token,
        data: { id: movie.id },
        method: 'POST',
      })
    )
  }

  const handleDeleteToListClick = async () => {
    setBookmarkCalled(true)
    const token = await authNetfilms.getToken()
    execute(
      clientNetfilms(`bookmark/${type}`, {
        token,
        data: { id: movie.id },
        method: 'DELETE',
      })
    )
  }

  if (!movie) {
    return <HeaderSkeleton />
  }
  //FIXME affichage title
  return (
    <header style={banner}>
      <div className='banner__contents'>
        <h1 className='banner__title'>{title ?? '...'}</h1>
        <div className='banner__buttons'>
          <button className='banner__button banner__buttonplay'>Lecture</button>
          {!isInList ? (
            <button
              onClick={handleAddToListClick}
              className='banner__button banner__buttonInfo'
            >
              Ajouter à ma liste
            </button>
          ) : (
            <button
              onClick={handleDeleteToListClick}
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
      {bookmarkCalled && status === 'done' && (
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
      {bookmarkCalled && status === 'error' && (
        <Snackbar
          open={bookmarkMessageOpen}
          autoHideDuration={4000}
          onClose={() => setBookmarkMessageOpen(false)}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            Problème lors de l'ajout : {error.message}.
          </Alert>
        </Snackbar>
      )}
    </header>
  )
}

export { Header }
