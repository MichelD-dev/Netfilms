import LoginRegister from 'components/LoginRegister'

function UnauthApp({ login, register, error }) {
  const imageUrl = '/images/posters.jpg'

  const backgroundStyle = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0, //TODO right and left nécessaires?
    right: 0,
    overflow: 'auto',
  }

  return (
    <div style={backgroundStyle}>
      <img
        src='/images/netflix-logo.png'
        alt='Logo Netfilms'
        style={{ margin: '30px', height: '50px' }}
      />

      <LoginRegister open login={login} register={register} error={error} />
    </div>
  )
}

export { UnauthApp }