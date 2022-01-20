import { NavBar } from '../components/NavBar'
import { Row } from '../components/Row'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { getRandomType } from 'utils/helpers'
import { TYPE_MOVIE, TYPE_TV } from 'config'
import { useMovieFilter } from 'utils/hooks'

const type = getRandomType()

const Accueil = () => {
  const headerMovie = useMovieFilter(type, 'trending')[0]

  return (
    <>
      <NavBar />
      <Header movie={headerMovie} type={type} />
      <Row
        wideImage
        watermark
        type={TYPE_MOVIE}
        filter='trending'
        title='Films: les dernières tendances'
      />
      <Row
        watermark
        type={TYPE_TV}
        filter='trending'
        title='Séries: les dernières tendances'
      />
      <Row
        type={TYPE_MOVIE}
        filter='toprated'
        title='Films: les mieux notés'
        watermark
        wideImage
      />
      <Row
        type={TYPE_TV}
        filter='genre'
        param='10759'
        title='Séries: action & aventure'
        watermark
        wideImage
      />
      <Row
        type={TYPE_MOVIE}
        filter='genre'
        param='53'
        title='Films: les meilleurs thrillers'
      />
      <Footer />
    </>
  )
}
export default Accueil
