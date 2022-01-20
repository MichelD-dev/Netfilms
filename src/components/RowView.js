import { TYPE_MOVIE } from '../config'
import { RowSkeleton } from '../skeletons/RowSkeleton'
import Card from '../components/Card'
import 'pages/Netfilms.css'

export const RowView = ({
  data = [],
  title = '',
  wideImage = false,
  type = TYPE_MOVIE,
  watermark = false,
  setHeader,
}) => {
  if (!data) {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {data?.map(movie => (
          <Card
            onClick={() => setHeader({ type, id: movie.id })}
            watermark={watermark}
            wideImage={wideImage}
            key={movie.id}
            id={movie.id}
            type={type}
          />
        ))}
      </div>
    </div>
  )
}
