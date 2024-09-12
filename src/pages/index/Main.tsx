import React from 'react';
import App from '../../App.tsx'
import Temp from '../../Temp.tsx'
import '../../index.css'
import "react-color-palette/css";
import "../../i18n/configs"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Main() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default Main