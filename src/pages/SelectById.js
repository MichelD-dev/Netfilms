import { useEffect, useState } from 'react'
import { NavBar } from 'components/NavBar'
import { Row } from 'components/Row'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { TYPE_MOVIE, TYPE_TV } from 'config'
import { useParams, useLocation } from 'react-router-dom'
import { useMovie } from 'utils/hooks'
import { useAddToHistory } from 'context/HistoryContext'
import './Netfilms.css'

const SelectById = ({ logout }) => {
  const { tvId, movieId } = useParams()
  const { pathname } = useLocation()
  const [type, setType] = useState(
    pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE
  )
  const [id, setId] = useState(type === TYPE_TV ? tvId : movieId)
  const headerMovie = useMovie(type, id)

  useAddToHistory(headerMovie, type)

  useEffect(() => {
    const type = pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE
    setType(type)
    setId(type === TYPE_TV ? tvId : movieId)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [movieId, tvId, pathname])

  return (
    <div>
      <NavBar logout={logout} />
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
    </div>
  )
}
export default SelectById
