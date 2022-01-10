import { useState } from 'react'
import { NavBar } from './NavBar'
import { Header } from './Header'
import { getRandomId } from '../utils/helper'
import { useQuery } from 'react-query'
import { clientNetfilms, clientApi } from '../utils/clientApi'
import * as authNetfilms from '../utils/authProvider'
import { TYPE_MOVIE, TYPE_TV } from '../config'
import Card from './Card'

const RANDOM_MOVIE = getRandomId(TYPE_MOVIE)

const Bookmarks = ({ logout }) => {
  const [header, setHeader] = useState({ type: null, movie: null })
  const { data, error, status } = useQuery('bookmark', async () => {
    const token = await authNetfilms.getToken()
    return clientNetfilms('bookmark', { token })
  })

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

  const { data: headerMovie } = useQuery(`${type}/${id}`, () =>
    clientApi(`${type}/${id}`)
  )

  return (
    <>
      <NavBar logout={logout} />
      <Header
        type={type}
        movie={headerMovie?.data}
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
    </>
  )
}

export { Bookmarks }
