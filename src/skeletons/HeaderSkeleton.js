import Skeleton from '@mui/material/Skeleton'
import 'pages/Netfilms.css'

const styles = {
  banner: {
    backgroundColor: '#1c2833',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  },
}

const HeaderSkeleton = () => {
  return (
    <header style={styles.banner}>
      <div className='banner__contents'>
        <h1 className='banner__title'>
          <Skeleton animation='wave' width={210} />
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button banner__buttonplay'>Lecture</button>
        </div>
        <h1 className='synopsis'>
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
        </h1>
      </div>
      <div className='banner--fadeBottom'></div>
    </header>
  )
}
export { HeaderSkeleton }
