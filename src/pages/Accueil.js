import { NavBar } from '../components/NavBar'
import { Row } from '../components/Row'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { getRandomType, getRandomId } from 'utils/helper'
import { TYPE_MOVIE, TYPE_TV } from 'config'
import './Netfilms.css'
import { useMovie } from 'utils/hooks'

const type = getRandomType()
const defaultMovieId = getRandomId(type)

const Accueil = () => {
  const headerMovie = useMovie(type, defaultMovieId)

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
export { Accueil }
