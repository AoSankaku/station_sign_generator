import React from 'react';
import App from '../../App.tsx'
import Temp from '../../Temp.tsx'
import { BrowserRouter } from 'react-router-dom'
import '../../index.css'
import "react-color-palette/css";
import "../../i18n/configs"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import***REMOVED*** from './***REMOVED***.tsx';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export { Page }

function Page() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Temp />
      </ThemeProvider>
    </React.StrictMode>
  )
}