import { useEffect, useState } from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

const NavBar = ({ logout }) => {
  const [appBarStyle, setAppBarStyle] = useState({
    background: 'transparent',
    boxShadow: 'none',
    transition: 'background .5s ease-out',
  })

  useEffect(() => {
    const onScroll = e => {
      if (e.target.documentElement.scrollTop >= 100) {
        setAppBarStyle({
          ...appBarStyle,
          background: '#111',
        })
      } else {
        setAppBarStyle({
          ...appBarStyle,
          background: 'transparent',
        })
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const margin10 = { margin: 10 }

  return (
    <AppBar style={appBarStyle}>
      <Toolbar>
        <img className='nav__logo' src='/images/netflix-logo.png' alt='' />
        <Link to='/'>
          <Typography style={margin10} variant='h6'>
            Accueil
          </Typography>
        </Link>
        <Link to='/series'>
          <Typography style={margin10} variant='h6'>
            Séries
          </Typography>
        </Link>
        <Link to='/movies'>
          <Typography style={margin10} variant='h6'>
            Films
          </Typography>
        </Link>
        <Link to='/news'>
          <Typography style={margin10} variant='h6'>
            Nouveautés les plus regardées
          </Typography>
        </Link>
        <Link to='/list'>
          <Typography style={margin10} variant='h6'>
            Ma liste
          </Typography>
        </Link>
        <img
          style={{ marginLeft: 'auto' }}
          className='nav__avatar'
          src='/images/netflix-avatar.png'
          alt=''
          onClick={logout}
        />
      </Toolbar>
    </AppBar>
  )
}

export { NavBar }
