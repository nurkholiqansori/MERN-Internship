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
  const [placeholder, setPlaceholder] = React.useState('')
  const [file, setFile] = React.useState('')
  const [validate, setValidate] = React.useState(false)
  const navigate = useNavigate()

  const handleFile = (event) => {
    if (
      placeholder.startsWith('https://') ||
      placeholder.startsWith('http://') ||
      placeholder.startsWith('www.') ||
      placeholder.startsWith('//') ||
      placeholder.startsWith('Https://') ||
      placeholder.startsWith('Http://')
    ) {
      setFile(event.target.value)
      setValidate(true)
    } else {
      toast.error('Please enter a valid URL')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (placeholder.length === 0) {
      toast.error('Please enter a valid URL')
      return false
    }
    if (
      !(
        placeholder.startsWith('https://') ||
        placeholder.startsWith('http://') ||
        placeholder.startsWith('www.') ||
        placeholder.startsWith('//') ||
        placeholder.startsWith('Https://') ||
        placeholder.startsWith('Http://')
      )
    ) {
      toast.error('Please enter a valid URL')
      return false
    }
    if (validate === false) {
      toast.error('Please enter a valid URL')
      return false
    }

    setValidate(true)

    const data = new FormData(event.currentTarget)
    const tempUrl = data.get('title').search(' ')
    const descriptionValidator = data.get('description')
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
        description: descriptionValidator,
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
          {file ? (
            <img
              src={file}
              alt='Preview'
              width='100%'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = 'https://via.placeholder.com/200?text=Not+Found'
                setValidate(false)
              }}
            />
          ) : (
            ''
          )}
          
          {/* <Button variant='contained' component='label'>
            Upload File
            <input
              type='file'
              accept='.jpg, .jpeg, .png'
              hidden
              onChange={(event) => handleFile(event)}
            />
          </Button> */}

          <TextField
            fullWidth
            required
            onChange={(event) => setPlaceholder(event.target.value)}
            onBlur={(event) => handleFile(event)}
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
