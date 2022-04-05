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
import EditIcon from '@mui/icons-material/Edit'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddData = () => {
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

    fetch('http://localhost:8000/api/add-article', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: data.get('url'),
        title: data.get('title'),
        url: stringUrl,
        description: data.get('description'),
      }),
    })
    toast('Data berhasil ditambahkan!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    })
    return navigate('/', { replace: true })
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
          Tambah Data
        </Typography>
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
          {/* <Button variant='contained' component='label'>
            Upload File
            <input type='file' accept='image/*' hidden />
          </Button> */}

          <TextField
            fullWidth
            required
            name='url'
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
            name='title'
            id='outlined-required'
            label='Judul Artikel'
          />
          <TextField
            fullWidth
            multiline
            required
            name='description'
            id='outlined-required'
            label='Isi Artikel'
          />
          <Button type='submit' variant='contained'>
            Simpan
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default AddData
