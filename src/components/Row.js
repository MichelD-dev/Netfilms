import { TYPE_MOVIE, imagePath400 } from '../config'
import { useQuery } from 'react-query'
import { clientApi } from '../utils/clientApi'
import { Alert, AlertTitle } from '@mui/material'
import { RowSkeleton } from 'skeletons/RowSkeleton'
import { Link } from 'react-router-dom'

const Row = ({
  title = '',
  wideImage = false,
  type = TYPE_MOVIE,
  param,
  filter = 'populaire',
  watermark = false,
}) => {
  const endpointLatest = `${type}/latest`
  const endpointPopular = `${type}/popular`
  const endpointTopRated = `${type}/top_rated`
  const endpointGenre = `discover/${type}?with_genres=${param}`
  const endpointTrending = `trending/${type}/day`

  const endpoint =
    (filter === 'populaire' && endpointPopular) ||
    (filter === 'latest' && endpointLatest) ||
    (filter === 'toprated' && endpointTopRated) ||
    (filter === 'genre' && endpointGenre) ||
    (filter === 'trending' && endpointTrending)

  const { data, error, status } = useQuery(endpoint, () => clientApi(endpoint))

  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return image ? `${imagePath400}${image}` : null
  }

  const watermarkClass = watermark ? 'watermarked' : ''

  if (status === 'loading' || status === 'idle') {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }

  if (status === 'error') {
    return (
      <Alert severity='error'>
        <AlertTitle>Une erreur est survenue</AlertTitle>
        Detail : {error.message}
      </Alert>
    )
  }

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {data?.data?.results?.map(movie => {
          return (
            <Link
              key={movie.id}
              to={`/${type}/${movie.id}`}
              className={`row__poster row__posterLarge ${watermarkClass}`}
            >
              <img
                src={buildImagePath(movie)}
                alt={movie.name || movie.title}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export { Row }
