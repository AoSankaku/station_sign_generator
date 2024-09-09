import React from 'react';
import App from '../../App.tsx'
import Temp from '../../Temp.tsx'
import { BrowserRouter } from 'react-router-dom'
import '../../index.css'
import "react-color-palette/css";
import "../../i18n/configs"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from '../../Head.tsx'
import { HelmetProvider } from 'react-helmet-async'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export { Page }

function Page() {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter basename='/station_sign_generator/'>
            <Head />
            <CssBaseline />
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </React.StrictMode>
  )
}