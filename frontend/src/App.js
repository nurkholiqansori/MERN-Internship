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
        <Tooltip title='Tambah Data' placement='right' arrow>
          <RouterLink to='/add-data'>
              <IconButton>
                <AddIcon />
              </IconButton>
          </RouterLink>
        </Tooltip>
        <Stack spacing={2}>
          <AllData />
        </Stack>
      </Container>
    </div>
  )
}

export default App
