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
  const [placeholder, setPlaceholder] = React.useState(data.image)
  const [file, setFile] = React.useState('')
  const [validate, setValidate] = React.useState(true)
  const params = useParams()


  React.useEffect(() => {
    fetch(`http://localhost:8000/api/article/${params.url}`, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result[0])
        setFile(result[0].image)
        setPlaceholder(result[0].image)
      })
  }, [])

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
      toast.error('Masukkan URL yang valid')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (placeholder.length === 0) {
      toast.error('Masukkan URL yang valid')
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
      toast.error('Masukkan URL yang valid')
      return false
    }
    if (validate === false) {
      toast.error('Masukkan URL yang valid')
      return false
    }

    setValidate(true)

    const data = new FormData(event.currentTarget)
    const tempUrl = data.get('title').search(' ')

    let stringUrl

    if (tempUrl === -1) {
      stringUrl = data.get('title').toLowerCase()
    } else {
      stringUrl = data.get('title').replaceAll(' ', '-').toLowerCase()
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
    }).then((res) => {
      if (res.status === 200) {
        toast.success('Data berhasil diubah')
        navigate('/', { replace: true })
      } else {
        toast.error('Terdapat data yang sama, silahkan ganti judul artikelnya')
      }
    })
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
            <img
              src={file}
              alt='Preview'
              width='100%'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src =
                  'https://via.placeholder.com/200?text=Not+Found'
                setValidate(false)
              }}
            />

            <TextField
              fullWidth
              required
              name='url'
              onChange={(event) => setPlaceholder(event.target.value)}
              onBlur={(event) => handleFile(event)}
              defaultValue={data.image}
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
