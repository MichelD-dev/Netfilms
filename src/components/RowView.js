import { useState } from 'react'
import { TYPE_MOVIE, imagePath400 } from '../config'
import { RowSkeleton } from '../skeletons/RowSkeleton'
import Card from '../components/Card'

export const RowView = ({
  data = [],
  title = '',
  wideImage = false,
  type = TYPE_MOVIE,
  watermark = false,
}) => {
  const [header, setHeader] = useState({ type: null, movie: null })
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
        {data.map(movie => (
          <Card
            onClick={(type, id) => {
              setHeader({ type, id })
            }}
            className={`row__poster row__posterLarge ${watermarkClass}`}
            key={movie.id}
            id={movie.id}
            type={type}
          />
          //FIXME
          // <Link key={movie.id} to={`/${type}/${movie.id}`}>
          //   <div className={`row__poster row__posterLarge ${watermarkClass}`}>
          //     <img src={buildImagePath(movie)} alt={movie.name} />
          //   </div>
          // </Link>
        ))}
      </div>
    </div>
  )
}
