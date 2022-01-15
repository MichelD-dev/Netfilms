import LoginRegister from 'components/LoginRegister'

const imageUrl = '/images/posters.jpg'

const backgroundStyle = {
  backgroundImage: `url('${imageUrl}')`,
  backgroundSize: 'cover',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  overflow: 'auto',
}

function UnauthApp() {
  return (
    <div style={backgroundStyle}>
      <img
        src='/images/netflix-logo.png'
        alt='Logo Netfilms'
        style={{ margin: '30px', height: '50px' }}
      />
      <LoginRegister open />
    </div>
  )
}

export default UnauthApp
