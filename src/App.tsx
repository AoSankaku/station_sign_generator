import { useState } from 'react'
import { Button, TextField, IconButton } from '@mui/material'
import Header from './components/Header'
import JrEastSign from './components/signs/JrEastSign'
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const App = () => {

  const [leftStationName, setLeftStationName] = useState('品川');
  const [stationName, setStationName] = useState('高輪ゲートウェイ');
  const [rightStationName, setRightStationName] = useState('田町');
  const [ratio, setRatio] = useState(5);
  const [direction, setDirection] = useState<'left' | 'right' | 'both'>('both')

  //Color definitions
  const color = {
    main: '#36ab33',
    line: '#89ff12',
  }

  return (
    <>
      <Header />
      <JrEastSign
        stationName={stationName}
        stationNameFurigana='たかなわげーとうぇい'
        stationNameEnglish='Takanawa Gateway'
        leftStationName={leftStationName}
        leftStationNameEnglish='Shinagawa'
        rightStationName={rightStationName}
        rightStationNameEnglish='Tamachi'
        lineColor={color.line}
        baseColor={color.main}
        ratio={ratio}
        direction={direction}
      />
      <TextField id="leftStationName" label="駅名" variant="outlined" value={leftStationName} onChange={(e) => { setLeftStationName(e.target.value) }} />
      <TextField id="stationName" label="駅名" variant="outlined" value={stationName} onChange={(e) => { setStationName(e.target.value) }} />
      <TextField id="rightStationName" label="駅名" variant="outlined" value={rightStationName} onChange={(e) => { setRightStationName(e.target.value) }} />
      <Button variant="contained" onClick={() => {
        if (ratio == 7) {
          setRatio(3)
        } else {
          setRatio(ratio + 2)
        }
      }}>switch length</Button>
      <>
        <IconButton aria-label="left" size="large" onClick={() => setDirection("left")}>
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="both" size="large" onClick={() => setDirection("both")}>
          <SwapHorizontalCircleIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="right" size="large" onClick={() => setDirection("right")}>
          <ArrowForwardIcon fontSize="inherit" />
        </IconButton>
      </>
    </>
  )
}



export default App
