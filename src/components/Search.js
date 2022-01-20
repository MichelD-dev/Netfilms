import { useState } from 'react'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { Header } from './Header'
import { TYPE_MOVIE, TYPE_TV } from '../config'
import { useParams } from 'react-router-dom'
import { useSearchMovie, useMovie } from '../utils/hooks'
import { RowView } from './RowView'
import 'pages/Netfilms.css'

const Search = ({ logout }) => {
  const { query } = useParams()
  const data = useSearchMovie(query)
  const [header, setHeader] = useState({ type: null, id: null })

  const movies = data.filter(movie => movie.media_type === TYPE_MOVIE)
  const series = data.filter(serie => serie.media_type === TYPE_TV)

  const id = header.id ?? movies?.[0]?.id ?? series?.[0]?.id ?? 785752

  const type =
    header.type ||
    (movies?.length !== 0 && TYPE_MOVIE) ||
    (series?.length !== 0 && TYPE_TV) ||
    TYPE_MOVIE

  const headerMovie = useMovie(type, id)

  return (
    <div>
      <NavBar logout={logout} />
      <Header movie={headerMovie} type={header?.type} />
      {data?.length === 0 ? (
        <div className='row'>
          <h2>Pas de résultats</h2>
        </div>
      ) : (
        <>
          <RowView
            data={movies}
            setHeader={setHeader}
            wideImage
            watermark
            type={TYPE_MOVIE}
            filter='trending'
            title='Films correspondants'
          />
          <RowView
            data={series}
            setHeader={setHeader}
            type={TYPE_TV}
            filter='trending'
            title='Séries correspondantes'
          />
        </>
      )}
      <Footer />
    </div>
  )
}

export default Search
