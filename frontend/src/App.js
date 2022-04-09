import {
  CssBaseline,
  Container,
  Stack,
  Link,
  IconButton,
  Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AllData from './components/All-data'
import { Link as RouterLink } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  
  return (
    <div>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ mx: 'auto', my: '2rem' }}>
        <Stack spacing={2} direction='row' justifyContent='space-between'>
          <Tooltip title='Tambah Data' placement='right' arrow>
            <RouterLink to='/add-data'>
              <IconButton>
                <AddIcon />
              </IconButton>
            </RouterLink>
          </Tooltip>
          {localStorage.getItem('token') ? (
            <Tooltip title='Logout' placement='left' arrow>
              <RouterLink to='/'>
                <IconButton
                  onClick={() => {
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                    toast.success('Logout Success')
                    navigate('/')
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </RouterLink>
            </Tooltip>
          ) : (
            <Tooltip title='Login' placement='left' arrow>
              <RouterLink to='/login'>
                <IconButton>
                  <LoginIcon />
                </IconButton>
              </RouterLink>
            </Tooltip>
          )}
        </Stack>
        <AllData />
      </Container>
    </div>
  )
}

export default App
