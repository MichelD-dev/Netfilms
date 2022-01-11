import { NavBar } from '../components/NavBar'
import { Row } from '../components/Row'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { getRandomType, getRandomId } from '../utils/helper'
import { TYPE_MOVIE, TYPE_TV } from '../config'
import './Netfilms.css'
import { useMovie } from 'utils/hooks'

const type = getRandomType()
const defaultMovieId = getRandomId(type)

const News = () => {
  const headerMovie = useMovie(type, defaultMovieId)

  return (
    <div>
      <NavBar />
      <Header movie={headerMovie?.data} type={type} />
      <Row
        wideImage
        watermark
        type={TYPE_MOVIE}
        filter='latest'
        title='A venir'
      />
      <Row watermark type={TYPE_MOVIE} filter='latest' title='Nouveautés' />
      <Row
        type={TYPE_MOVIE}
        filter='toprated'
        title='Les mieux notés'
        watermark
        wideImage
      />
      <Row
        type={TYPE_TV}
        filter='genre'
        param='10759'
        title='Action & aventure'
        watermark
        wideImage
      />
      <Row
        type={TYPE_MOVIE}
        filter='genre'
        param='53'
        title='Les meilleurs Thrillers'
      />
      <Footer />
    </div>
  )
}
export { News }
