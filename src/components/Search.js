import React from 'react'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { Header } from './Header'
import { TYPE_MOVIE, TYPE_TV } from '../config'
import { useParams } from 'react-router-dom'
import { useSearchMovie, useMovie } from '../utils/hooks'
import { RowView } from './RowView'

const Search = ({ logout }) => {
  const { query } = useParams()
  const defaultMovie = useMovie(TYPE_MOVIE, 785752)
  const data = useSearchMovie(query)
  const headerMovie = data?.[0] ?? defaultMovie
  const type = headerMovie?.media_type
  const movies = data.filter(movie => movie.media_type === TYPE_MOVIE)
  const series = data.filter(serie => serie.media_type === TYPE_TV)

  return (
    <div>
      <NavBar logout={logout} />
      <Header movie={headerMovie} type={type} />
      {data?.length === 0 ? (
        <div className='row'>
          <h2>Pas de résultats</h2>
        </div>
      ) : (
        <>
          <RowView
            data={movies}
            wideImage={true}
            watermark={true}
            type={TYPE_MOVIE}
            filter='trending'
            title='Films correspondants'
          />
          <RowView
            data={series}
            wideImage={false}
            watermark={true}
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

export { Search }
