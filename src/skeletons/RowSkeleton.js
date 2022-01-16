import Skeleton from '@mui/material/Skeleton'
import 'pages/Netfilms.css'

const RowSkeleton = ({ title = '', nbElements = 20, wideImage = false }) => {
  const postersSkeletons = []
  for (let i = 0; i < nbElements; i++) {
    postersSkeletons.push(
      <div
        key={i}
        className='row__poster row__posterLarge'
        style={{ backgroundColor: '#1c2833' }}
      >
        <Skeleton
          variant='rect'
          animation='wave'
          width={wideImage ? 400 : 166}
          height={wideImage ? 225 : 250}
        />
      </div>
    )
  }

  return (
    <>
      <div className='row'>
        <h2>{title}</h2>
        <div className='row__posters'>{postersSkeletons}</div>
      </div>
    </>
  )
}
export { RowSkeleton }
