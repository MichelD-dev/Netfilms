import { useEffect } from 'react'
import { TYPE_MOVIE, imagePath400 } from '../config'
import { useFetchData } from '../utils/hooks'
import { clientApi } from '../utils/clientApi'
import { Alert, AlertTitle } from '@mui/material'
import { RowSkeleton } from 'skeletons/RowSkeleton'

const Row = ({
  title = '',
  wideImage = false,
  type = TYPE_MOVIE,
  param,
  filter = 'populaire',
  watermark = false,
}) => {
  const { data, error, status, execute } = useFetchData()
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

  useEffect(() => {
    execute(clientApi(`${endpoint}`))
  }, [endpoint, execute])

  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return `${imagePath400}${image}`
  }

  const watermarkClass = watermark ? 'watermarked' : ''

  if (status === 'fetching' || status === 'idle') {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }

  //   if (status === 'error') {
  //     return (
  //       <Alert severity='error'>
  //         <AlertTitle>Une erreur est survenue</AlertTitle>
  //         Detail : {error.message}
  //       </Alert>
  //     )
  //   }

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {data?.data.results.map(movie => {
          return (
            <div
              key={movie.id}
              className={`row__poster row__posterLarge ${watermarkClass}`}
            >
              <img src={buildImagePath(movie)} alt={movie.name} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { Row }
