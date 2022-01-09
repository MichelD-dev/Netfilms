import { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import { Row } from './Row'
import { Footer } from './Footer'
import { Header } from './Header'
import { getRandomType, getRandomId } from '../utils/helper'
import { clientApi } from '../utils/clientApi'
import { makeStyles } from '@mui/styles'
import { Alert, AlertTitle } from '@mui/material'
import { useFetchData } from '../utils/hooks'
import { TYPE_MOVIE, TYPE_TV } from '../config'
import './Netfilm.css'
//FIXME bug affichage
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

const News = () => {
  const classes = useStyles()
  const { data: headerMovie, error, status, execute } = useFetchData()
  const [type] = useState(getRandomType())
  const defaultMovieId = getRandomId(type)
  const [queried, setQueried] = useState(true)

  useEffect(() => {
    if (!queried) {
      return
    }
    execute(clientApi(`${type}/${defaultMovieId}`))
    setQueried(false)
  }, [execute, defaultMovieId, type, queried])

  if (status === 'error') {
    throw new Error(error.message)
  }

  return (
    <div>
      <NavBar />
      <Header movie={headerMovie?.data} type={type} />
      <Row
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter='latest'
        title='A venir'
      />
      <Row
        wideImage={false}
        watermark={true}
        type={TYPE_MOVIE}
        filter='latest'
        title='Nouveautés'
      />
      <Row
        type={TYPE_MOVIE}
        filter='toprated'
        title='Les mieux notés'
        watermark={true}
        wideImage={true}
      />
      <Row
        type={TYPE_TV}
        filter='genre'
        param='10759'
        title='Action & aventure'
        watermark={true}
        wideImage={true}
      />
      <Row
        type={TYPE_MOVIE}
        filter='genre'
        param='53'
        title='Les meilleurs Thrillers'
        watermark={false}
        wideImage={false}
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
export { News }
