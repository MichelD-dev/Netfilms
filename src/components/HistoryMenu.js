import { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import HistoryIcon from '@mui/icons-material/History'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import { useTheme } from '@mui/material/styles'
import { TYPE_MOVIE, TYPE_TV, imagePath400 } from 'config'
import { useNavigate } from 'react-router-dom'
import { useHistory } from 'context/HistoryContext'

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

function HistoryMenu({ style }) {
  const { series, movies } = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div style={style}>
      <HistoryIcon onClick={handleClick} />
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {(series.length !== 0 || movies.length !== 0) && (
          <MenuItem onClick={handleClose} disableRipple>
            <HistoryIcon />
            Dernières visites
          </MenuItem>
        )}
        {movies.length !== 0 && (
          <Typography variant='h2'>
            <Box
              sx={{
                fontSize: 'h6.fontSize',
                mt: 2,
                ml: 3,
              }}
            >
              Films
            </Box>
          </Typography>
        )}
        {movies?.map((movie, id) => (
          <MenuItem key={id} onClick={handleClose} disableRipple>
            <HistoryMenuCard wideImage movie={movie} type={TYPE_MOVIE} />
          </MenuItem>
        ))}
        <Divider sx={{ my: 0.5 }} />
        {series.length !== 0 && (
          <Typography variant='h2'>
            <Box
              sx={{
                fontSize: 'h6.fontSize',
                mt: 2,
                ml: 3,
              }}
            >
              Series
            </Box>
          </Typography>
        )}
        {series?.map((serie, id) => (
          <MenuItem key={id} onClick={handleClose} disableRipple>
            <HistoryMenuCard wideImage movie={serie} type={TYPE_TV} />
          </MenuItem>
        ))}
        {series.length === 0 && movies.length === 0 && (
          <MenuItem onClick={handleClose} disableRipple>
            <DoNotDisturbIcon />
            Pas d'historique
          </MenuItem>
        )}
      </StyledMenu>
    </div>
  )
}
function HistoryMenuCard({ movie, type, wideImage = false }) {
  const theme = useTheme()
  const navigate = useNavigate()

  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return image ? `${imagePath400}${image}` : null
  }

  const title = (movie?.name ?? movie?.original_title)?.substring(0, 20)

  const description = movie?.overview?.substring(0, 30) + '...'

  const handleClick = () => navigate(`/${type}/${movie.id}`)

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5' style={{ width: '250px' }}>
            {title}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
            style={{ width: '250px' }}
          >
            {description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label='previous'>
            {theme.direction === 'rtl' ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label='play/pause'>
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label='next'>
            {theme.direction === 'rtl' ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>

      <CardMedia
        onClick={handleClick}
        component='img'
        sx={{ width: 200 }}
        image={buildImagePath(movie)}
        alt={title}
      />
    </Card>
  )
}

export { HistoryMenu }
