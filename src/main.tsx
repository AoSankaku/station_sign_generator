import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "react-color-palette/css";
import "./i18n/configs"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from './Head.tsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

/*
const currentUrl = document.URL;
const baseUrl = new URL(currentUrl);
const lang = baseUrl.searchParams.get('lang');
*/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <Head />
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
