import { useState, useRef } from 'react'
import { Button, TextField, IconButton, Slider, Box, Grid, List, ListItem, Switch, ListSubheader } from '@mui/material'
import Header from './components/Header'
import JrEastSign from './components/signs/JrEastSign'
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Delete } from '@mui/icons-material';
import Konva from 'konva';
import { SketchPicker } from 'react-color'
import StationProps from './components/signs/StationProps';

const App = () => {

  const ref = useRef<Konva.Stage>(null)

  // Default Value - Will be replaced with LocalStorage data
  const [currentData, setCurrentData] = useState<StationProps>({
    leftStationName: '品川',
    leftStationNameFurigana: 'しながわ',
    leftStationNameEnglish: 'Shinagawa',
    leftStationNumber: 'JY25',
    stationName: '高輪ゲートウェイ',
    stationNameFurigana: 'たかなわげーとうぇい',
    stationNameEnglish: 'Takanawa Gateway',
    stationNameChinese: '高轮Gateway',
    stationNameKorean: '다카나와 게이트웨이',
    stationNumber: 'JY26',
    stationThreeLetterCode: 'TGW',
    stationArea: [
      {
        id: 1,
        name: "山",
        isWhite: true,
      },
      {
        id: 2,
        name: "区",
        isWhite: false,
      }
    ],
    stationNote: "",
    rightStationName: '田町',
    rightStationNameFurigana: 'たまち',
    rightStationNameEnglish: 'Tamachi',
    rightStationNumber: 'JY27',
    ratio: 4.5,
    direction: 'left',
    baseColor: '#36ab33',
    lineColor: '#89ff12',
  });

  const updateCurrentData = <K extends keyof StationProps>(key: K, value: StationProps[K]) => {
    setCurrentData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }
  /* 
  To shorten the function below:
  
  setStationData(prevState => ({
    ...prevState,
    leftStationName: '新宿',
  }));
  */

  const handleSave = () => {
    if (ref.current) {
      const uri = ref.current.toDataURL({ pixelRatio: 3 });
      // Create a link element
      const link = document.createElement('a');
      link.download = `${currentData.stationName}.png`;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Function handleSave failed. This is completely unexpected behavior as the canvas is always rendered.')
    }
  };

  return (
    <>
      <Header />
      <JrEastSign
        stationName={currentData.stationName}
        stationNameFurigana={currentData.stationNameFurigana}
        stationNameEnglish={currentData.stationNameEnglish}
        stationNameChinese={currentData.stationNameChinese}
        stationNameKorean={currentData.stationNameKorean}
        stationNumber={currentData.stationNumber}
        stationThreeLetterCode={currentData.stationThreeLetterCode}
        stationArea={currentData.stationArea}
        stationNote={currentData.stationNote}
        leftStationName={currentData.leftStationName}
        leftStationNameEnglish={currentData.leftStationNameEnglish}
        leftStationNumber={currentData.leftStationNumber}
        rightStationName={currentData.rightStationName}
        rightStationNameEnglish={currentData.rightStationNameEnglish}
        rightStationNumber={currentData.rightStationNumber}
        lineColor={currentData.lineColor}
        baseColor={currentData.baseColor}
        ratio={currentData.ratio}
        direction={currentData.direction}
        ref={ref}
      />

      <Button variant="contained" onClick={() => handleSave()}>save</Button>
      <Slider defaultValue={currentData.ratio} valueLabelDisplay='auto' step={0.5} marks min={3} max={8} style={{ width: "200px" }} onChange={(_, v) => updateCurrentData("ratio", v as number)} />
      <TextField id="leftStationName" label="左駅名" variant="outlined" value={currentData.leftStationName} onChange={(e) => { updateCurrentData("leftStationName", e.target.value) }} />
      <TextField id="leftStationNameFurigana" label="左駅名（よみがな）" variant="outlined" value={currentData.leftStationNameFurigana} onChange={(e) => { updateCurrentData("leftStationNameFurigana", e.target.value) }} />
      <TextField id="leftStationNameEnglish" label="左駅名（英語）" variant="outlined" value={currentData.leftStationNameEnglish} onChange={(e) => { updateCurrentData("leftStationNameEnglish", e.target.value) }} />
      <TextField id="leftStationNumber" label="左駅ナンバリング" variant="outlined" value={currentData.leftStationNumber} onChange={(e) => { updateCurrentData("leftStationNumber", e.target.value) }} />
      <TextField id="stationName" label="駅名" variant="outlined" value={currentData.stationName} onChange={(e) => { updateCurrentData("stationName", e.target.value) }} />
      <TextField id="stationNameFurigana" label="駅名（ふりがな）" variant="outlined" value={currentData.stationNameFurigana} onChange={(e) => { updateCurrentData("stationNameFurigana", e.target.value) }} />
      <TextField id="stationNameEnglish" label="駅名（英語）" variant="outlined" value={currentData.stationNameEnglish} onChange={(e) => { updateCurrentData("stationNameEnglish", e.target.value) }} />
      <TextField id="stationNameChinese" label="駅名（繁体中文）" variant="outlined" value={currentData.stationNameChinese} onChange={(e) => { updateCurrentData("stationNameChinese", e.target.value) }} />
      <TextField id="stationNameKorean" label="駅名（한국어）" variant="outlined" value={currentData.stationNameKorean} onChange={(e) => { updateCurrentData("stationNameKorean", e.target.value) }} />
      <TextField id="stationNumber" label="駅ナンバリング" variant="outlined" value={currentData.stationNumber} onChange={(e) => { updateCurrentData("stationNumber", e.target.value) }} />
      <TextField id="stationThreeLetterCode" label="スリーレターコード" variant="outlined" value={currentData.stationThreeLetterCode} onChange={(e) => { updateCurrentData("stationThreeLetterCode", e.target.value) }} />
      <TextField id="stationNote" label="駅補足" variant="outlined" value={currentData.stationNote} onChange={(e) => { updateCurrentData("stationNote", e.target.value) }} />
      <TextField id="rightStationName" label="右駅名" variant="outlined" value={currentData.rightStationName} onChange={(e) => { updateCurrentData("rightStationName", e.target.value) }} />
      <TextField id="rightStationNameFurigana" label="右駅名（ふりがな）" variant="outlined" value={currentData.rightStationNameFurigana} onChange={(e) => { updateCurrentData("rightStationNameFurigana", e.target.value) }} />
      <TextField id="rightStationNameEnglish" label="右駅名（英語）" variant="outlined" value={currentData.rightStationNameEnglish} onChange={(e) => { updateCurrentData("rightStationNameEnglish", e.target.value) }} />
      <TextField id="rightStationNumber" label="右駅ナンバリング" variant="outlined" value={currentData.rightStationNumber} onChange={(e) => { updateCurrentData("rightStationNumber", e.target.value) }} />
      <>
        <IconButton aria-label="left" size="large" onClick={() => updateCurrentData("direction", "left")}>
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="both" size="large" onClick={() => updateCurrentData("direction", "both")}>
          <SwapHorizontalCircleIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="right" size="large" onClick={() => updateCurrentData("direction", "right")}>
          <ArrowForwardIcon fontSize="inherit" />
        </IconButton>
      </>
      <Box sx={{ flexGrow: 1, maxWidth: 150 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button variant='contained' onClick={() => {
              updateCurrentData("stationArea", currentData.stationArea ? [
                ...currentData.stationArea,
                {
                  id: Date.now() - 1723600000000,
                  name: "",
                  isWhite: true,
                }
              ] : undefined)
            }}>追加</Button>
            <List subheader={<ListSubheader>特定都区市内</ListSubheader>}>
              {currentData.stationArea?.map((e) => {
                return (
                  <ListItem
                    key={e.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label='delete' onClick={() => {
                        updateCurrentData("stationArea", currentData.stationArea?.filter(c => c.id !== e.id))
                      }}>
                        <Delete />
                      </IconButton>
                    }
                  >
                    <TextField label="名称" variant='standard' value={e.name} onChange={(i) => {
                      const nextStationArea = currentData.stationArea?.map((c) => {
                        if (e.id === c.id) {
                          return ({
                            id: c.id,
                            name: i.target.value,
                            isWhite: c.isWhite,
                          });
                        } else {
                          return c;
                        }
                      })
                      updateCurrentData("stationArea", nextStationArea)
                    }} />
                    <Switch
                      checked={e.isWhite}
                      onChange={() => {
                        const nextStationArea = currentData.stationArea?.map((c) => {
                          if (e.id === c.id) {
                            return ({
                              id: c.id,
                              name: c.name,
                              isWhite: !c.isWhite,
                            });
                          } else {
                            return c;
                          }
                        })
                        updateCurrentData("stationArea", nextStationArea)
                      }}
                    />
                  </ListItem>
                )
              })}
            </List>
          </Grid>
        </Grid>
      </Box>
      <SketchPicker color={currentData.baseColor} onChange={(color) => { updateCurrentData("baseColor", color.hex) }} />
      <SketchPicker color={currentData.lineColor} onChange={(color) => { updateCurrentData("lineColor", color.hex) }} />
      <TextField fullWidth multiline variant="outlined" value={JSON.stringify(currentData, null, 2)} />
    </>
  )
}


export default App
