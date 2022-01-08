import { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { getRandomId } from '../utils/helper'
import { clientApi } from '../utils/clientApi'
import { makeStyles } from '@mui/styles'
import { Alert, AlertTitle } from '@mui/material'
import { useFetchData } from '../utils/hooks'
import { TYPE_MOVIE } from '../config'
import './Netfilm.css'
import { Row } from './Row'
import { Header } from './Header'
import { NavBar } from './NavBar'

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

const Movies = () => {
  const classes = useStyles()
  const { data: headerMovie, error, status, execute } = useFetchData()
  const type = TYPE_MOVIE
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
        title='Films'
      />
      <Row
        wideImage={false}
        watermark={true}
        type={type}
        filter='toprated'
        title='Les mieux notés'
      />
      <Row
        type={type}
        filter='populaire'
        title='Les films populaires'
        watermark={true}
        wideImage={true}
      />
      <Row
        type={type}
        filter='genre'
        param='14'
        title='Les films fantastiques'
        watermark={true}
        wideImage={true}
      />
      <Row
        type={type}
        filter='genre'
        param='878'
        title='Les films de science-fiction'
        watermark={false}
        wideImage={false}
      />

      {status === 'error' ? (
        <div className={classes.alert}>
          <Alert severity='error'>
            <AlertTitle>Une erreur est survenue</AlertTitle>
            Détail : {error.message}
          </Alert>
        </div>
      ) : null}
      <Footer />
    </div>
  )
}
export { Movies }
