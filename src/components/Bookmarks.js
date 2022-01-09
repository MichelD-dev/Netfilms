import { useState, useEffect, useReducer } from 'react'
import { NavBar } from './NavBar'
import { Header } from './Header'
import { useFetchData } from '../utils/hooks'
import { clientNetfilms, clientApi } from '../utils/clientApi'
import * as authNetfilms from '../utils/authProvider'
import { TYPE_MOVIE, TYPE_TV, imagePath400 } from '../config'

const Bookmarks = ({ logout }) => {
  const { execute, data } = useFetchData()
  const { data: headerMovie, execute: executeHeader } = useFetchData()
  const [header, setHeader] = useState({ type: null, movie: null })
  const [load, reload] = useReducer(val => !val, false)

  useEffect(() => {
    const getBookmarks = async () => {
      const token = await authNetfilms.getToken()
      execute(clientNetfilms('bookmark', { token }))
    }
    getBookmarks()
  }, [execute, load])

  const type =
    (data?.bookmark?.movies?.length !== 0 && TYPE_MOVIE) ||
    (data?.bookmark?.series?.length !== 0 && TYPE_TV) ||
    TYPE_MOVIE

  useEffect(() => {
    const id =
      header.id ??
      data?.bookmark?.movies?.[0] ??
      data?.bookmark?.series?.[0] ??
      749274
    executeHeader(clientApi(`${header.type ?? type}/${id}`))
  }, [data, executeHeader, header, type, load])

  return (
    <>
      <NavBar logout={logout} />
      <Header
        type={type}
        movie={headerMovie?.data}
        reload={reload}
        noBookmarks={
          data?.bookmark?.movies?.length === 0 &&
          data?.bookmark?.series?.length === 0
        }
      />
      <div className='row'>
        <h2>Films favoris</h2>
        <div className='row__posters'>
          {data?.bookmark?.movies.map(movie => (
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
          {data?.bookmark?.series.map(serie => (
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

const Card = ({ onClick, id, type, watermark, wideImage }) => {
  const { execute, data } = useFetchData()
  const [image, setImage] = useState()

  useEffect(() => {
    execute(clientApi(`${type}/${id}`))
  }, [execute, id, type])

  useEffect(() => {
    const buildImagePath = data => {
      const image = wideImage ? data?.backdrop_path : data?.poster_path
      return image ? `${imagePath400}${image}` : null
    }
    setImage(buildImagePath(data?.data))
  }, [data, wideImage])

  const watermarkClass = watermark ? 'watermarked' : ''

  return (
    <div
      key={id}
      onClick={() => {
        onClick(type, id)
      }}
    >
      <div className={`row__poster row__posterLarge ${watermarkClass}`}>
        <img src={image} alt='' />
      </div>
    </div>
  )
}
export { Bookmarks }
