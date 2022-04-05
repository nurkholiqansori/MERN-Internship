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

function App() {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ mx: 'auto', my: '2rem' }}>
        <RouterLink to='/add-data'>
          <Tooltip title='Tambah Data' placement='right' arrow>
            <Link underline='none'>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </RouterLink>
        <Stack spacing={2}>
          <AllData />
        </Stack>
      </Container>
    </div>
  )
}

export default App
