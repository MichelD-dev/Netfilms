import React from 'react'
import { TYPE_MOVIE, imagePath400 } from '../config'
import { Link } from 'react-router-dom'
import { RowSkeleton } from '../skeletons/RowSkeleton'

export const RowView = ({
  data = [],
  title = '',
  wideImage = true,
  type = TYPE_MOVIE,
  watermark = false,
}) => {
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
            <Link key={movie.id} to={`/${type}/${movie.id}`}>
              <div className={`row__poster row__posterLarge ${watermarkClass}`}>
                <img src={buildImagePath(movie)} alt={movie.name} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
