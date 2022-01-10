import { NavBar } from './NavBar'
import { Row } from './Row'
import { Footer } from './Footer'
import { Header } from './Header'
import { getRandomId } from '../utils/helper'
import { clientApi } from '../utils/clientApi'
import { useQuery } from 'react-query'
import { TYPE_TV } from '../config'
import './Netfilm.css'

const type = TYPE_TV
const defaultMovieId = getRandomId(type)

const Series = () => {
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
        type={type}
        filter='trending'
        title='Séries tendance'
      />
      <Row type={type} filter='toprated' title='Séries les mieux notées' />

      <Row
        type={type}
        filter='populaire'
        title='Les séries populaires'
        watermark
        wideImage
      />

      <Row
        type={type}
        filter='genre'
        param='99'
        title='Les documentaires'
        watermark
        wideImage
      />

      <Row
        type={type}
        filter='genre'
        param='80'
        title='Les séries criminelles'
      />
      <Footer />
    </div>
  )
}
export { Series }
