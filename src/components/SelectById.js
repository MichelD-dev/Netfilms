import { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import { Row } from './Row'
import { Footer } from './Footer'
import { Header } from './Header'
import { clientApi } from '../utils/clientApi'
import { makeStyles } from '@mui/styles'
import { Alert, AlertTitle } from '@mui/material'
import { useFetchData } from '../utils/hooks'
import { TYPE_MOVIE, TYPE_TV } from '../config'
import { useParams, useLocation } from 'react-router-dom'
import './Netfilm.css'

const useStyles = makeStyles(theme => ({
  alert: {
    width: '50%',
    margin: 'auto',
    marginBotton: '50px',
  },
  progress: {
    marginLeft: '30px',
  },
}))

const SelectById = () => {
  const classes = useStyles()
  const { data: headerMovie, error, status, execute } = useFetchData()
  const { tvId, movieId } = useParams()
  const { pathname } = useLocation()

  const [type, setType] = useState(
    pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE
  )

  const [id, setId] = useState(type === TYPE_TV ? tvId : movieId)

  useEffect(() => {
    execute(clientApi(pathname))
  }, [execute, pathname])

  useEffect(() => {
    setType(type)
    setId(type === TYPE_TV ? tvId : movieId)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [movieId, tvId, type])

  if (status === 'error') {
    throw new Error(error.message)
  }
  return (
    <div>
      <NavBar />
      <Header movie={headerMovie?.data} type={type} />
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

      {status === 'error' ? (
        <div className={classes.alert}>
          <Alert severity='error'>
            <AlertTitle>Une erreur est survenue</AlertTitle>
            Detail : {error.message}
          </Alert>
        </div>
      ) : null}

      <Footer />
    </div>
  )
}
export { SelectById }
