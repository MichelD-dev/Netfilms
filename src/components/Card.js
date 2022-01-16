import { imagePath400 } from '../config'
import { clientApi } from '../utils/clientApi'
import { useQuery } from 'react-query'
import { useState, useEffect } from 'react'
import CardMedia from '@mui/material/CardMedia'
import 'pages/Netfilms.css'

const Card = ({ onClick, id, type, watermark, wideImage }) => {
  const { data } = useQuery(`${type}/${id}`, () => clientApi(`${type}/${id}`))
  const [image, setImage] = useState('')

  useEffect(() => {
    const buildImagePath = data => {
      const image = wideImage ? data?.backdrop_path : data?.poster_path
      return image ? `${imagePath400}${image}` : null
    }
    setImage(buildImagePath(data?.data))
  }, [data, wideImage])

  const watermarkClass = watermark ? 'watermarked' : ''

  return (
    <>
      <CardMedia
        key={id}
        onClick={() => {
          onClick(type, id)
        }}
      >
        <div className={`row__poster row__posterLarge ${watermarkClass}`}>
          <img src={image} alt='' />
        </div>
      </CardMedia>
    </>
  )
}

export default Card
