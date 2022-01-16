import { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/Header'
import { getRandomId } from '../utils/helpers'
import { TYPE_MOVIE, TYPE_TV } from '../config'
import Card from '../components/Card'
import { useBookmark, useMovie } from 'utils/hooks'
import { Profiler } from 'utils/Profiler'
import 'pages/Netfilms.css'

const RANDOM_MOVIE = getRandomId(TYPE_MOVIE)

const Bookmarks = ({ logout }) => {
  const data = useBookmark()
  const [header, setHeader] = useState({ type: null, movie: null })

  const id =
    header.id ??
    data?.bookmark?.movies?.[0] ??
    data?.bookmark?.series?.[0] ??
    RANDOM_MOVIE

  const type =
    header.type ||
    (data?.bookmark?.movies?.length !== 0 && TYPE_MOVIE) ||
    (data?.bookmark?.series?.length !== 0 && TYPE_TV) ||
    TYPE_MOVIE

  const headerMovie = useMovie(TYPE_MOVIE, id)

  return (
    <Profiler id='Bookmark' appData={{ bookmark: data?.bookmark }}>
      <NavBar logout={logout} />
      <Header
        type={type}
        movie={headerMovie}
        noBookmarks={
          data?.bookmark?.movies?.length === 0 &&
          data?.bookmark?.series?.length === 0
        }
      />
      <div className='row'>
        <h2>Films favoris</h2>
        <div className='row__posters'>
          {data?.bookmark.movies.map(movie => (
            <Card
              onClick={(type, id) => {
                setHeader({ type, id })
              }}
              key={movie}
              id={movie}
              type={TYPE_MOVIE}
              wideImage
              watermark
            />
          ))}
        </div>
      </div>
      <div className='row'>
        <h2>Séries favorites</h2>
        <div className='row__posters'>
          {data?.bookmark.series.map(serie => (
            <Card
              onClick={(type, id) => {
                setHeader({ type, id })
              }}
              key={serie}
              id={serie}
              type={TYPE_TV}
            />
          ))}
        </div>
      </div>
    </Profiler>
  )
}

export default Bookmarks
