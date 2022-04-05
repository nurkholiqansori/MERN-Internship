import React from 'react'
import {
  CssBaseline,
  Container,
  Box,
  Button,
  Stack,
  Typography,
  TextField,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateData = () => {
  const [data, setData] = React.useState({})
  const params = useParams()

  React.useEffect(() => {
    fetch(`http://localhost:8000/api/article/${params.url}`, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => setData(result[0]))
  }, [])

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const tempUrl = data.get('title').search(' ')

    let stringUrl

    if (tempUrl === -1) {
      stringUrl = data.get('title').toLowerCase()
    } else {
      stringUrl = data.get('title').replaceAll(' ', '-')
    }

    fetch(`http://localhost:8000/api/update-data/${params.url}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: data.get('url'),
        title: data.get('title'),
        url: stringUrl,
        description: data.get('description'),
      }),
    })
    toast('Data berhasil diubah!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    return navigate('/')
  }
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
          Ubah Data
        </Typography>
        {data.title ? (
          <Box
            component='form'
            onSubmit={(event) => handleSubmit(event)}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <TextField
              fullWidth
              required
              name='url'
              value={data.image}
              id='outlined-required'
              label='URL Foto Artikel'
              helperText={
                <Typography variant='subtitle2' component='span'>
                  <i>
                    Gunakan{' '}
                    <a
                      href='https://unsplash.com'
                      rel='noreferrer noopener'
                      target='_blank'
                    >
                      Unsplash
                    </a>
                  </i>
                </Typography>
              }
            />
            <TextField
              fullWidth
              required
              defaultValue={data.title}
              name='title'
              id='outlined-required'
              label='Judul Artikel'
            />
            <TextField
              fullWidth
              multiline
              required
              defaultValue={data.description}
              name='description'
              id='outlined-required'
              label='Isi Artikel'
            />
            <Button type='submit' variant='contained'>
              Simpan
            </Button>
          </Box>
        ) : (
          <Typography variant='h4' component='h1' align='center' my='2rem'>
            Data tidak ditemukan
          </Typography>
        )}
      </Container>
    </>
  )
}

export default UpdateData
