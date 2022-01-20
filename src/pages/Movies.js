import { Footer } from '../components/Footer'
import { TYPE_MOVIE } from '../config'
import './Netfilms.css'
import { Row } from '../components/Row'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'
import { useMovieFilter } from 'utils/hooks'

const type = TYPE_MOVIE

const Movies = () => {
  const headerMovie = useMovieFilter(type, 'trending')[0]

  return (
    <div>
      <NavBar />
      <Header movie={headerMovie} type={type} />
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
export default Movies
