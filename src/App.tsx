import { useState, useEffect, useRef } from 'react'
import { Button, TextField, IconButton } from '@mui/material'
import Header from './components/Header'
import JrEastSign from './components/signs/JrEastSign'
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Konva from 'konva';
import { SketchPicker } from 'react-color'


const App = () => {

  const ref = useRef<Konva.Stage>(null)

  const [leftStationName, setLeftStationName] = useState('品川');
  const [leftStationNameFurigana, setLeftStationNameFurigana] = useState('しながわ');
  const [leftStationNameEnglish, setLeftStationNameEnglish] = useState('Shinagawa');
  const [stationName, setStationName] = useState('高輪ゲートウェイ');
  const [stationNameFurigana, setStationNameFurigana] = useState('たかなわげーとうぇい');
  const [stationNameEnglish, setStationNameEnglish] = useState('Takanawa Gateway');
  const [stationNameChinese, setStationNameChinese] = useState('高轮Gateway');
  const [stationNameKorean, setStationNameKorean] = useState('다카나와 게이트웨이');
  const [stationNumber, setStationNumber] = useState('JY26');
  const [rightStationName, setRightStationName] = useState('田町');
  const [rightStationNameFurigana, setRightStationNameFurigana] = useState('たまち');
  const [rightStationNameEnglish, setRightStationNameEnglish] = useState('Tamachi');
  const [ratio, setRatio] = useState(5);
  const [direction, setDirection] = useState<'left' | 'right' | 'both'>('both');
  const [mainColor, setMainColor] = useState('#36ab33');
  const [lineColor, setLineColor] = useState('#89ff12');
  const [outputJson, setOutputJson] = useState({});

  useEffect(() => {
    setOutputJson({
      leftStationName: leftStationName,
      leftStationNameFurigana: leftStationNameFurigana,
      leftStationNameEnglish: leftStationNameEnglish,
      stationName: stationName,
      stationNameFurigana: stationNameFurigana,
      stationNameEnglish: stationNameEnglish,
      stationNameChinese: stationNameChinese,
      stationNameKorean: stationNameKorean,
      stationNumber: stationNumber,
      rightStationName: rightStationName,
      rightStationNameFurigana: rightStationNameFurigana,
      rightStationNameEnglish: rightStationNameEnglish,
      ratio: ratio,
      direction: direction,
      mainColor: mainColor,
      lineColor: lineColor,
    })
  }, [leftStationName, leftStationNameFurigana, leftStationNameEnglish])

  const handleSave = () => {
    console.dir(typeof (ref.current))
    if (ref.current && ref.current) {
      const uri = ref.current.toDataURL();
      // Create a link element
      const link = document.createElement('a');
      link.download = `${stationName}.png`;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('handleSave failed. This is completely unexpected behavior as the canvas is always rendered.')
    }
  };

  return (
    <>
      <Header />
      <JrEastSign
        stationName={stationName}
        stationNameFurigana={stationNameFurigana}
        stationNameEnglish={stationNameEnglish}
        stationNameChinese={stationNameChinese}
        stationNameKorean={stationNameKorean}
        stationNumber={stationNumber}
        leftStationName={leftStationName}
        leftStationNameEnglish={leftStationNameEnglish}
        rightStationName={rightStationName}
        rightStationNameEnglish={rightStationNameEnglish}
        lineColor={lineColor}
        baseColor={mainColor}
        ratio={ratio}
        direction={direction}
        ref={ref}
      />

      <Button variant="contained" onClick={() => handleSave()}>save</Button>
      <TextField id="leftStationName" label="左駅名" variant="outlined" value={leftStationName} onChange={(e) => { setLeftStationName(e.target.value) }} />
      <TextField id="leftStationNameFurigana" label="左駅名（よみがな）" variant="outlined" value={leftStationNameFurigana} onChange={(e) => { setLeftStationNameFurigana(e.target.value) }} />
      <TextField id="leftStationNameEnglish" label="左駅名（英語）" variant="outlined" value={leftStationNameEnglish} onChange={(e) => { setLeftStationNameEnglish(e.target.value) }} />
      <TextField id="stationName" label="駅名" variant="outlined" value={stationName} onChange={(e) => { setStationName(e.target.value) }} />
      <TextField id="stationNameFurigana" label="駅名（ふりがな）" variant="outlined" value={stationNameFurigana} onChange={(e) => { setStationNameFurigana(e.target.value) }} />
      <TextField id="stationNameEnglish" label="駅名（英語）" variant="outlined" value={stationNameEnglish} onChange={(e) => { setStationNameEnglish(e.target.value) }} />
      <TextField id="stationNameChinese" label="駅名（繁体中文）" variant="outlined" value={stationNameChinese} onChange={(e) => { setStationNameChinese(e.target.value) }} />
      <TextField id="stationNameKorean" label="駅名（한국어）" variant="outlined" value={stationNameKorean} onChange={(e) => { setStationNameKorean(e.target.value) }} />
      <TextField id="stationNumber" label="駅ナンバリング" variant="outlined" value={stationNumber} onChange={(e) => { setStationNumber(e.target.value) }} />
      <TextField id="rightStationName" label="右駅名" variant="outlined" value={rightStationName} onChange={(e) => { setRightStationName(e.target.value) }} />
      <TextField id="rightStationNameFurigana" label="右駅名（ふりがな）" variant="outlined" value={rightStationNameFurigana} onChange={(e) => { setRightStationNameFurigana(e.target.value) }} />
      <TextField id="rightStationNameEnglish" label="右駅名（英語）" variant="outlined" value={rightStationNameEnglish} onChange={(e) => { setRightStationNameEnglish(e.target.value) }} />
      <SketchPicker color={mainColor} onChange={(color) => { setMainColor(color.hex) }} />
      <SketchPicker color={lineColor} onChange={(color) => { setLineColor(color.hex) }} />
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
      <TextField fullWidth multiline variant="outlined" value={JSON.stringify(outputJson, null, 2)} />
    </>
  )
}



export default App
