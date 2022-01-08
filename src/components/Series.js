import { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import { Row } from './Row'
import { Footer } from './Footer'
import { Header } from './Header'
import { getRandomId } from '../utils/helper'
import { clientApi } from '../utils/clientApi'
import { makeStyles } from '@mui/styles'
import { Alert, AlertTitle } from '@mui/material'
import { useFetchData } from '../utils/hooks'
import { TYPE_TV } from '../config'
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

const Series = () => {
  const classes = useStyles()
  const { data: headerMovie, error, status, execute } = useFetchData()
  const type = TYPE_TV
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
        type={type}
        filter='trending'
        title='Séries tendance'
      />
      <Row
        wideImage={false}
        watermark={true}
        type={type}
        filter='toprated'
        title='Séries les mieux notées'
      />

      <Row
        type={type}
        filter='populaire'
        title='Les séries populaires'
        watermark={true}
        wideImage={true}
      />

      <Row
        type={type}
        filter='genre'
        param='99'
        title='Les documentaires'
        watermark={true}
        wideImage={true}
      />

      <Row
        type={type}
        filter='genre'
        param='80'
        title='Les séries criminelles'
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
export { Series }
