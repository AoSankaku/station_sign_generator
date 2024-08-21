import { useState, useRef } from 'react'
import { Button, Toolbar } from '@mui/material'
import Header from './components/Header'
import JrEastSign from './components/signs/JrEastSign'
import { Download } from '@mui/icons-material';
import Konva from 'konva';
import DirectInputStationProps from './components/signs/DirectInputStationProps';
import DirectInput from './components/inputs/DirectInput';
import InputStationInfo from './components/InputStationInfo';
import { useTranslation } from "react-i18next"

const App = () => {

  const ref = useRef<Konva.Stage>(null)

  const { t } = useTranslation()

  // Default Value - Will be replaced with LocalStorage data
  const [currentData, setCurrentData] = useState<DirectInputStationProps>({
    leftStationName: '品川',
    leftStationNameFurigana: 'しながわ',
    leftStationNameEnglish: 'Shinagawa',
    leftStationNumber: 'JY25',
    stationName: '高輪ゲートウェイ',
    stationNameFurigana: 'たかなわげーとうぇい',
    stationNameEnglish: 'Takanawa Gateway',
    stationNameChinese: '高轮Gateway',
    stationNameKorean: '다카나와 게이트웨이',
    stationNumber: ['JY26'],
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
      const uri = ref.current.toDataURL({ pixelRatio: 3 });
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
      <Button variant="contained" onClick={() => handleSave()}><Download />save</Button>
      <DirectInput {...currentData} onChange={handleChangeDirect} />
      <InputStationInfo text={test.text} text2={test.text2} onChange={handleChangeTest} />
    </>
  )
}


export default App
