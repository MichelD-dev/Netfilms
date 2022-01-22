import { useEffect, useState } from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import { HistoryMenu } from './HistoryMenu'
import { useImmer } from 'use-immer'
import 'pages/Netfilms.css'

const margin = { margin: '10px 20px' }

const Search = styled('div')(({ theme }) => ({
  marginRight: '10px',
  marginLeft: 'auto',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const NavBar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [appBarStyle, setAppBarStyle] = useImmer({
    background: 'transparent',
    boxShadow: 'none',
    transition: 'background .5s ease-out',
  })

  useEffect(() => {
    const onScroll = e => {
      if (e.target.documentElement.scrollTop >= 100) {
        setAppBarStyle(draft => {
          draft.background = '#111'
        })
      } else {
        setAppBarStyle(draft => {
          draft.background = 'transparent'
        })
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleKeyPress = e => {
    e.keyCode === 13 && navigate(`/search/${query}`)
  }

  return (
    <AppBar style={appBarStyle}>
      <Toolbar>
        <img
          className='nav__logo'
          src='/images/netflix-logo.png'
          alt='Logo Netflix'
          style={margin}
        />
        <Link to='/'>
          <Typography style={margin} variant='h6'>
            Accueil
          </Typography>
        </Link>
        <Link to='/series'>
          <Typography style={margin} variant='h6'>
            Séries
          </Typography>
        </Link>
        <Link to='/movies'>
          <Typography style={margin} variant='h6'>
            Films
          </Typography>
        </Link>
        <Link to='/news'>
          <Typography style={margin} variant='h6'>
            Nouveautés les plus regardées
          </Typography>
        </Link>
        <Link to='/list'>
          <Typography style={margin} variant='h6'>
            Ma liste
          </Typography>
        </Link>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onKeyDown={handleKeyPress}
            onChange={e => setQuery(e.target.value)}
            value={query}
            placeholder='Rechercher'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <HistoryMenu style={{ cursor: 'pointer', marginRight: '10px' }} />
        <img
          style={{ cursor: 'pointer' }}
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
