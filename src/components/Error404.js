import { AppBar, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import { NavBar } from './NavBar'
import 'pages/Netfilms.css'

function Error404() {
  const imageUrl = '/images/bg-lost-in-space.png'
  return (
    <div
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'auto',
      }}
    >
      <NavBar />
      <AppBar style={{ background: '#111' }}>
        <Toolbar>
          <img className='nav__logo' src='/images/netflix-logo.png' alt='' />
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#fff',
          height: '100%',
        }}
      >
        <div
          role='alert'
          style={{
            textAlign: 'center',
            paddingTop: '200px',
          }}
        >
          <h1 style={{ fontSize: '2.5em' }}>Vous cherchez votre chemin?</h1>
          <p style={{ margin: '30px' }}>
            Désolé, nous n'avons pas trouvé cette page. Un vaste choix de
            programmes vous attend sur la page d'accueil.
          </p>
          <div className='banner__buttons'>
            <Link to='/'>
              <button className='banner__button banner__buttonplay'>
                Accueil Netfilms
              </button>
            </Link>
          </div>
        </div>
        <p style={{ margin: 'auto' }}>
          Code d'erreur: <strong>404</strong>
        </p>
      </div>
    </div>
  )
}

export default Error404
