import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    const email = data.get('email')
    const password = data.get('password')

    console.log({
      email: email,
      password: password,
    })
    fetch('http://localhost:8000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((data) => {
        toast(data.message)
        if (data.status === 'success') {
          localStorage.setItem('token', data.accessToken)
          navigate('/')
        }
      })
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ mx: 'auto', my: '2rem' }}>
        <Box
          component='form'
          sx={{ mx: 'auto', my: '5rem' }}
          onSubmit={(event) => handleSubmit(event)}
        >
          <Typography component='h1' variant='h4' align='center'>
            Login
          </Typography>
          <Box sx={{ my: 5, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div>
              <InputLabel htmlFor='email'>Email address</InputLabel>
              <Input
                type='text'
                color='success'
                placeholder='Isi email disini'
                fullWidth
                id='email'
                name='email'
                aria-describedby='email'
                required
              />
              {/* <FormHelperText id='email'>
              We'll never share your email.
            </FormHelperText> */}
            </div>
            <div>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                color='success'
                fullWidth
                placeholder='Isi password disini'
                id='password'
                name='password'
                aria-describedby='password'
                required
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <Button type='submit' variant='contained' color='primary'>
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Login
