import { useState, useEffect, useRef } from 'react'
import { Button, Grid, Toolbar, Box, Select, InputLabel, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'
import Header from './components/Header'
import Footer from './components/Footer'
import JrEastSign, { height as JrEastSignHeight } from './components/signs/JrEastSign'
import { Download } from '@mui/icons-material';
import Konva from 'konva';
import DirectInputStationProps from './components/signs/DirectInputStationProps';
import DirectInput from './components/inputs/DirectInput';
import InputStationInfo from './components/InputStationInfo';
import { useTranslation } from "react-i18next"
import { v7 as uuidv7 } from 'uuid'

const App = () => {

  const ref = useRef<Konva.Stage>(null)

  const { t } = useTranslation()

  // Default Value - Will be replaced with LocalStorage data
  const [currentData, setCurrentData] = useState<DirectInputStationProps>({
    leftStationName: '品川',
    leftStationNameFurigana: 'しながわ',
    leftStationNameEnglish: 'Shinagawa',
    leftStationNumberPrimary: 'JY25',
    leftStationNumberSecondary: '',
    stationName: '高輪ゲートウェイ',
    stationNameFurigana: 'たかなわげーとうぇい',
    stationNameEnglish: 'Takanawa Gateway',
    stationNameChinese: '高轮Gateway',
    stationNameKorean: '다카나와 게이트웨이',
    stationNumberPrimary: 'JY26',
    stationNumberSecondary: '',
    stationThreeLetterCode: 'TGW',
    stationArea: [
      {
        id: uuidv7(),
        name: "山",
        isWhite: true,
      },
      {
        id: uuidv7(),
        name: "区",
        isWhite: false,
      }
    ],
    stationNote: "",
    rightStationName: '田町',
    rightStationNameFurigana: 'たまち',
    rightStationNameEnglish: 'Tamachi',
    rightStationNumberPrimary: 'JY27',
    rightStationNumberSecondary: '',
    ratio: 4.5,
    direction: 'left',
    baseColor: '#36ab33',
    lineColor: '#89ff12',
  });


  type imageSize = {
    label: string,
    value: number,
  }

  const [currentStyle, setCurrentStyle] = useState("jreast");
  // currentCanvasHeight depends on currentStyle
  const [currentCanvasHeight, setCurrentCanvasHeight] = useState(0);
  useEffect(() => {
    switch (currentStyle) {
      case "jreast": setCurrentCanvasHeight(JrEastSignHeight); break;
      default: setCurrentCanvasHeight(0); break;
    }
  }, [currentStyle])
  // We don't need useEffect here...right?
  const currentCanvasWidth = currentCanvasHeight * currentData.ratio;
  const [saveSize, setSaveSize] = useState(3)
  const [saveSizeList, setSaveSizeList] = useState<imageSize[]>([])
  useEffect(() => {
    const result = []
    const size = ["SS", "S", "M", "L", "XL", "XXL"]
    for (let i = 1, l = 6; i <= l; i++) {
      result.push({
        label: `${currentCanvasWidth * i} × ${currentCanvasHeight * i} (${size[i - 1]})`,
        value: i
      })
    }
    setSaveSizeList(result)
  }, [currentCanvasHeight, currentData.ratio])

  /*
  const updateCurrentData = <K extends keyof StationProps>(key: K, value: StationProps[K]) => {
    setCurrentData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }
  */

  /* 
  To shorten the function below:
  
  setStationData(prevState => ({
    ...prevState,
    leftStationName: '新宿',
  }));
  */

  const handleSave = () => {
    if (ref.current) {
      const actualHeight = ref.current.height();
      const canvasHeight = currentCanvasHeight;
      const basePixelRatio = canvasHeight / actualHeight;
      const uri = ref.current.toDataURL({ pixelRatio: basePixelRatio * saveSize });
      console.log(uri.length, uri.length * 0.75)
      // Create a link element
      const link = document.createElement('a');
      link.download = `${currentData.stationName}.png`;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error(t("error.on-save"))
    }
  };

  const [test, setTest] = useState({
    text: "あいうえお",
    text2: "かきくけこ",
  });

  const handleChangeTest = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setTest({
      ...test,
      [name]: value,
    });
    console.dir(test);
  };


  const handleChangeDirect = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setCurrentData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    console.dir(currentData);
  };

  return (
    <>
      <Header />
      <Toolbar />
      <JrEastSign
        stationName={currentData.stationName}
        stationNameFurigana={currentData.stationNameFurigana}
        stationNameEnglish={currentData.stationNameEnglish}
        stationNameChinese={currentData.stationNameChinese}
        stationNameKorean={currentData.stationNameKorean}
        stationNumberPrimary={currentData.stationNumberPrimary}
        stationNumberSecondary={currentData.stationNumberSecondary}
        stationThreeLetterCode={currentData.stationThreeLetterCode}
        stationArea={currentData.stationArea}
        stationNote={currentData.stationNote}
        leftStationName={currentData.leftStationName}
        leftStationNameEnglish={currentData.leftStationNameEnglish}
        leftStationNumberPrimary={currentData.leftStationNumberPrimary}
        leftStationNumberSecondary={currentData.leftStationNumberSecondary}
        rightStationName={currentData.rightStationName}
        rightStationNameEnglish={currentData.rightStationNameEnglish}
        rightStationNumberPrimary={currentData.rightStationNumberPrimary}
        rightStationNumberSecondary={currentData.rightStationNumberSecondary}
        lineColor={currentData.lineColor}
        baseColor={currentData.baseColor}
        ratio={currentData.ratio}
        direction={currentData.direction}
        ref={ref}
      />
      <Box sx={{ width: '100%', padding: '25px' }}>
        <Grid container spacing={2} style={{ padding: '10px' }}>
          <Grid item xs={12} sm={8} lg={10}>
            <FormControl fullWidth>
              <InputLabel id='save-image-size-label'>{t("input.image-size")}</InputLabel>
              <Select labelId='save-image-size' value={saveSize} label={t("input.image-size")} onChange={(e: SelectChangeEvent<number>) => setSaveSize(e.target.value as number)}>
                {saveSizeList.map((e) => (
                  <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} lg={2} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="secondary" size="large" variant="contained" onClick={() => handleSave()} style={{ fontWeight: 700 }}><Download />{t("input.save")}</Button>
          </Grid>
        </Grid>
      </Box>
      <DirectInput {...currentData} onChange={handleChangeDirect} />
      <InputStationInfo text={test.text} text2={test.text2} onChange={handleChangeTest} />
      <Footer />
    </>
  )
}


export default App
