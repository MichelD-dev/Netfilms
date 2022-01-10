import { NavBar } from './NavBar'
import { Row } from './Row'
import { Footer } from './Footer'
import { Header } from './Header'
import { getRandomType, getRandomId } from 'utils/helper'
import { clientApi } from 'utils/clientApi'
import { useQuery } from 'react-query'
import { TYPE_MOVIE, TYPE_TV } from 'config'
import './Netfilm.css'

const type = getRandomType()
const defaultMovieId = getRandomId(type)

const NetfilmsApp = ({ logout }) => {
  const {
    data: headerMovie,
    error,
    status,
  } = useQuery(`${type}/${defaultMovieId}`, () =>
    clientApi(`${type}/${defaultMovieId}`)
  )

  return (
    <>
      <NavBar logout={logout} />
      <Header movie={headerMovie?.data} type={type} />
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
export { NetfilmsApp }
