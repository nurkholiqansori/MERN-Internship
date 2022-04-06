import {
  Box,
  Button,
  Container,
  CssBaseline,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import EditIcon from '@mui/icons-material/Edit'
import { Link, useParams } from 'react-router-dom'

const Article = () => {
  const [data, setData] = React.useState({
    image: 'https://source.unsplash.com/random/400x200',
    title: 'Lorem Ipsum',
    description: 'Ini akan ditampilkan ketika gagal mendapatkan artikel.',
  })
  const params = useParams()
  fetch(`http://localhost:8000/api/article/${params.url}`, {
    method: 'GET',
    redirect: 'follow',
  })
    .then((response) => response.json())
    .then((result) => setData(result[0]))

  React.useEffect(() => {
    return setData({
      image: 'https://source.unsplash.com/random/400x200',
      title: 'Lorem Ipsum',
      description: 'Ini akan ditampilkan ketika gagal mendapatkan artikel.',
    })
  }, [])

  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ mx: 'auto', my: '2rem' }}>
        <Stack spacing={2} direction='row' justifyContent='space-between'>
          <Link to='/'>
            <Button variant='contained' startIcon={<ArrowBackIosIcon />}>
              Kembali
            </Button>
          </Link>
        </Stack>
        <Typography variant='h3' component='h1' align='center' my='2rem'>
          {data.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            overflow: 'hidden',
          }}
          maxWidth='400'
        >
          {data.image ? (
            <img
              src={data.image}
              alt={data.title}
              style={{ objectFit: 'cover', borderRadius: '10px' }}
            />
          ) : (
            <Skeleton variant='rectangular' width={400} height={200} />
          )}
        </Box>
        <Typography
          variant='body1'
          component='p'
          align='justify'
          my='2rem'
          whiteSpace='pre-line'
        >
          {data.description}
        </Typography>
        <Box
          component='footer'
          spacing={2}
          direction='row'
          justifyContent='center'
          borderTop='1px solid #000000'
          pb='2rem'
        >
          <Typography variant='body1' component='p' align='center' my='2rem'>
            Blog Artikel tahun {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default Article
