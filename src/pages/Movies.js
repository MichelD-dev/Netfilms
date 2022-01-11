import { Footer } from '../components/Footer'
import { getRandomId } from '../utils/helper'
import { TYPE_MOVIE } from '../config'
import './Netfilm.css'
import { Row } from '../components/Row'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'
import { useMovie } from 'utils/hooks'

const type = TYPE_MOVIE
const defaultMovieId = getRandomId(type)

const Movies = () => {
  const headerMovie = useMovie(type, defaultMovieId)

  return (
    <div>
      <NavBar />
      <Header movie={headerMovie?.data} type={type} />
      <Row wideImage watermark type={type} filter='trending' title='Films' />
      <Row watermark type={type} filter='toprated' title='Les mieux notés' />
      <Row
        type={type}
        filter='populaire'
        title='Les films populaires'
        watermark
        wideImage
      />
      <Row
        type={type}
        filter='genre'
        param='14'
        title='Les films fantastiques'
        watermark
        wideImage
      />
      <Row
        type={type}
        filter='genre'
        param='878'
        title='Les films de science-fiction'
      />
      <Footer />
    </div>
  )
}
export { Movies }
