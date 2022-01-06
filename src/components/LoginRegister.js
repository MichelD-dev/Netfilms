import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { makeStyles } from '@mui/styles'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { useFetchData } from 'utils/hooks'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '330px',
    // '& > *': {//FIXME erreur...
    //   margin: theme.spacing(1),
    // },
  },
  dialog: {
    opacity: '0.9',
  },
}))

const FormLogin = ({ create = false, login, register, logout }) => {
  const [checked, setChecked] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const classes = useStyles()
  const label = create ? 'Inscrivez-vous' : 'Connexion'
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        id='filled-basic'
        label='Email ou numéro de téléphone'
        variant='filled'
        color='secondary'
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ opacity: '1' }}
      />
      <TextField
        id='filled-basic'
        type='password'
        label='Mot de passe'
        variant='filled'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {create ? (
        <>
          <Button
            style={{ margin: '20px 0 5px 0' }}
            variant='contained'
            color='secondary'
            onClick={() => register({ username, password })}
          >
            {label}
          </Button>
          <small>* Consultez nos CGV</small>
          <small>This page is protected by Google reCAPTCHA</small>
        </>
      ) : (
        <>
          <Button
            style={{ margin: '20px 0 5px 0' }}
            variant='contained'
            color='secondary'
            onClick={() => login({ username, password })}
          >
            {label}
          </Button>
          <div>
            {' '}
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name='checkedA'
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    color='primary'
                  />
                }
                label={
                  <Typography component={'span'} style={{ fontSize: '0.8rem' }}>
                    Se souvenir de moi
                  </Typography>
                }
              />
            </FormGroup>
          </div>
        </>
      )}
    </form>
  )
}

function PopupLogin({
  open,
  handleClose,
  signup = false,
  login,
  register,
  logout,
  error,
  status,
}) {
  const classes = useStyles()
  const [create, setCreate] = useState(signup)

  const handleSignUp = () => {
    setCreate(true)
  }

  const handleSignIn = () => {
    setCreate(false)
  }

  const label = create ? 'Inscrivez-vous' : 'Connexion'

  const spinner =
    status === 'fetching ' ? <CircularProgress color='secondary' /> : <></>

  return (
    <>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        style={{ backgroundColor: 'transparent' }}
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{label}</DialogTitle>
        <DialogContent>
          <FormLogin
            create={create}
            login={login}
            register={register}
            logout={logout}
          />
          {error ? (
            <Alert severity='error'>Erreur : {error.message}</Alert>
          ) : null}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'flex-start' }}>
          {!create ? (
            <Button onClick={handleSignUp} color='secondary'>
              Nouveau sur Netfilms? {spinner}
            </Button>
          ) : (
            <Button onClick={handleSignIn} color='secondary' autoFocus>
              Vous possédez déjà un compte ? {spinner}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
export default PopupLogin
