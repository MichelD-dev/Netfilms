import { NavBar } from '../components/NavBar'
import { Row } from '../components/Row'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { getRandomId } from '../utils/helpers'
import { TYPE_TV } from '../config'
import './Netfilms.css'
import { useMovie } from 'utils/hooks'

const type = TYPE_TV
const defaultMovieId = getRandomId(type)

const Series = () => {
  const headerMovie = useMovie(type, defaultMovieId)

  return (
    <div>
      <NavBar />
      <Header movie={headerMovie} type={type} />
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
export default Series
