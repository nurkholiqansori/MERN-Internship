import React from 'react'
;<Skeleton variant='rectangular' width={210} height={118} />
import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Link,
  Button,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogActions,
  CardHeader,
  IconButton,
  Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AllData = () => {
  const [open, setOpen] = React.useState(false)
  const [tempData, setTempData] = React.useState({})
  const [data, setData] = React.useState([])
  const navigate = useNavigate()

  const handleDelete = () => {
    fetch('http://localhost:8000/api/delete-article', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: tempData.url,
      }),
    })
    toast('Berhasil dihapus', {
      type: 'success',
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    })
    setOpen(false)
    navigate('/')
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteArticle = (index) => {
    setTempData(data[index])
    setOpen(true)
  }
  React.useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch('http://localhost:8000/api/articles', requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log('error', error))
  }, [open])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Yakin untuk menghapus artikel{' '}
          {tempData ? tempData.title : tempData.title}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>
            Batal
          </Button>
          <Button onClick={handleDelete} autoFocus variant='contained'>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant='h3' component='h1' align='center' my='1.5rem'>
        Semua Artikel
      </Typography>
      <Stack spacing={5}>
        {data === null ? (
          'Wait...'
        ) : data.length === 0 ? (
          <Typography align='center'>
            Anda belum menambahkan artikel, silahkan tambahkan data pada tanda
            plus diatas.
          </Typography>
        ) : (
          data.map((item, index) => (
            <Card sx={{ width: '100%' }} key={item.title}>
              {localStorage.getItem('token') ? (
                <CardHeader
                  title={item.title}
                  action={
                    <Tooltip title='Edit' placement='top' arrow>
                      <Link href={'/update-data/' + item.url}>
                        <IconButton aria-label='edit'>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  }
                />
              ) : (
                ''
              )}
              {item ? (
                <CardMedia
                  component='img'
                  image={item.image}
                  title={item.title}
                />
              ) : (
                <Skeleton variant='rectangular' width={310} height={118} />
              )}

              <CardContent>
                <Typography variant='body2'>
                  {item.description.length > 100 ? (
                    <>{item.description.substring(0, 100)}...</>
                  ) : (
                    item.description
                  )}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  p: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Link href={'/article/' + item.url} title={item.title}>
                  <Button variant='contained' color='primary'>
                    Read More
                  </Button>
                </Link>
                {localStorage.getItem('token') ? (
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => deleteArticle(index)}
                  >
                    Hapus
                  </Button>
                ) : (
                  ''
                )}
              </CardActions>
            </Card>
          ))
        )}
      </Stack>
    </div>
  )
}

export default AllData
