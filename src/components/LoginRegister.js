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
import { useAuth } from 'context/AuthContext'
import { useImmer } from 'use-immer'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '330px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  dialog: {
    opacity: '0.9',
  },
}))

const FormLogin = ({ create = false }) => {
  const { login, register } = useAuth()
  const [checked, setChecked] = useState(false)
  const [{ name, password }, setUser] = useImmer({ name: '', password: '' })

  const classes = useStyles()
  const label = create ? 'Inscrivez-vous' : 'Connexion'
  return (
    <form className={classes.root} noValidate>
      <TextField
        id='filled-basic'
        label='Email ou numéro de téléphone'
        variant='filled'
        color='secondary'
        autoComplete='off'
        value={name}
        onChange={e =>
          setUser(draft => {
            draft.name = e.target.value
          })
        }
      />
      <TextField
        id='filled-basic'
        type='password'
        label='Mot de passe'
        variant='filled'
        autoComplete='off'
        value={password}
        onChange={e =>
          setUser(draft => {
            draft.password = e.target.value
          })
        }
      />
      {create ? (
        <>
          <Button
            style={{ margin: '20px 0 5px 0' }}
            variant='contained'
            color='secondary'
            onClick={() => register({ username: name, password })}
          >
            {label}
          </Button>
          <small>* Consultez nos CGV</small>
          <small>This page is protected by Google reCAPTCHA.</small>
        </>
      ) : (
        <>
          <Button
            style={{ margin: '20px 0 5px 0' }}
            variant='contained'
            color='secondary'
            onClick={() => login({ username: name, password })}
          >
            {label}
          </Button>
          <div>
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

function PopupLogin({ open, handleClose, signup = false, status }) {
  const classes = useStyles()
  const [create, setCreate] = useState(signup)
  const { login, logout, register, authError: error } = useAuth()

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
