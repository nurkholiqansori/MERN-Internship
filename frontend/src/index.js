import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Article from './components/Article'
import UpdateData from './components/Update-data'
import AddData from './components/Add-data'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightGreen, grey } from '@mui/material/colors'
import Login from './components/Login'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightGreen[200],
    },
    divider: lightGreen[200],
  },
})

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/article/:url' element={<Article />} />
          <Route path='/add-data' element={<AddData />} />
          <Route path='/update-data/:url' element={<UpdateData />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  </>,
  document.getElementById('root'),
)
