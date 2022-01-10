import { NavBar } from './NavBar'
import { Row } from './Row'
import { Footer } from './Footer'
import { Header } from './Header'
import { getRandomType, getRandomId } from '../utils/helper'
import { clientApi } from '../utils/clientApi'
import { useQuery } from 'react-query'
import { TYPE_MOVIE, TYPE_TV } from '../config'
import './Netfilm.css'
//FIXME bug affichage

const type = getRandomType()
const defaultMovieId = getRandomId(type)

const News = () => {
  const {
    data: headerMovie,
    error,
    status,
  } = useQuery(`${type}/${defaultMovieId}`, () =>
    clientApi(`${type}/${defaultMovieId}`)
  )

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
