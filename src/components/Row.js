import { TYPE_MOVIE, imagePath400 } from '../config'
import { RowSkeleton } from 'skeletons/RowSkeleton'
import { Link } from 'react-router-dom'
import { useMovieFilter } from 'utils/hooks'
import 'pages/Netfilms.css'

const Row = ({
  title = '',
  wideImage = false,
  type = TYPE_MOVIE,
  param,
  filter = 'populaire',
  watermark = false,
}) => {
  const data = useMovieFilter(type, filter, param)

  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return image ? `${imagePath400}${image}` : null
  }

  const watermarkClass = watermark ? 'watermarked' : ''

  if (!data) {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {data.map(movie => {
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
