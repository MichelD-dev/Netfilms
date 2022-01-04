import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const NavBar = () => {
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
        <a href='/'>
          <Typography style={margin10} variant='h6'>
            Accueil
          </Typography>
        </a>
        <a href='/series'>
          <Typography style={margin10} variant='h6'>
            Séries
          </Typography>
        </a>
        <a href='/movies'>
          <Typography style={margin10} variant='h6'>
            Films
          </Typography>
        </a>
        <a href='/news'>
          <Typography style={margin10} variant='h6'>
            Nouveautés les plus regardées
          </Typography>
        </a>
        <a href='/list'>
          <Typography style={margin10} variant='h6'>
            Ma liste
          </Typography>
        </a>
        <img
          style={{ marginLeft: 'auto' }}
          className='nav__avatar'
          src='/images/netflix-avatar.png'
          alt=''
        />
      </Toolbar>
    </AppBar>
  )
}

export { NavBar }
