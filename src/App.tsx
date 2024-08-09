import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import Header from './components/Header'
import JrEastSign from './components/signs/JrEastSign'

const App = () => {

  const [stationName, setStationName] = useState('高輪ゲートウェイ');
  const [ratio, setRatio] = useState(5);

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
        leftStationName='品川'
        leftStationNameEnglish='Shinagawa'
        rightStationName='田町'
        rightStationNameEnglish='Tamachi'
        lineColor={color.line}
        baseColor={color.main}
        ratio={ratio}
      />
      <TextField id="stationName" label="駅名" variant="outlined" value={stationName} onChange={(e) => { setStationName(e.target.value) }} />
      <Button variant="contained" onClick={() => {
        if (ratio == 7) {
          setRatio(3)
        } else {
          setRatio(ratio + 2)
        }
      }}>unchiburi</Button>
    </>
  )
}



export default App
