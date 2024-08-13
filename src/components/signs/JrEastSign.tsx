import { useState, useEffect, forwardRef } from "react"
import StationProps from "./StationProps"

import { Rect, Layer, Stage, Text, Line } from 'react-konva'
import styled from 'styled-components'
import Konva from "konva"
import processStationNumber, { processedStationNumber } from "../../functions/processStationNumber"

import '../../assets/css/fonts.css'

const JrEastSign = forwardRef<Konva.Stage, StationProps>((props, ref: React.Ref<Konva.Stage>) => {

  // font importer memo
  // const font = new FontFace('CustomFont', 'url(/path/to/font.woff2)');
  //const stageRef = useRef<Konva.Stage>(null)

  const { stationName, stationNameEnglish, stationNameFurigana, stationNameChinese, stationNameKorean, stationNote, leftStationName, leftStationNameEnglish, leftStationNumber, rightStationName, rightStationNameEnglish, rightStationNumber, stationNumber, stationThreeLetterCode, baseColor, lineColor, direction, ratio } = props
  const getSpacedStationName = () => {
    const str = stationName
    switch (str.length) {
      case 2: return str.split('').join('　')
      case 3: return str.split('').join(' ')
      default: return str
    }
  }
  const height = 130;
  const [width, setWidth] = useState(0);
  const startingPoint = 40;
  const lineHeight = 24
  const linePosY = 70
  const [processedStationNumber, setProcessedStationNumber] = useState<processedStationNumber>({});
  const [processedLeftStationNumber, setProcessedLeftStationNumber] = useState<processedStationNumber>({});
  const [processedRightStationNumber, setProcessedRightStationNumber] = useState<processedStationNumber>({});
  // const [isFontLoaded, setIsFontLoaded] = useState(false)
  const [stageKey, setStageKey] = useState(0)

  useEffect(() => {
    setWidth(height * ratio);
  }, [ratio])

  useEffect(() => {
    if (stationNumber) {
      setProcessedStationNumber(processStationNumber(stationNumber))
    } else {
      setProcessedStationNumber({})
    }
  }, [stationNumber])

  useEffect(() => {
    if (leftStationNumber) {
      setProcessedLeftStationNumber(processStationNumber(leftStationNumber))
    } else {
      setProcessedLeftStationNumber({})
    }
  }, [stationNumber])

  useEffect(() => {
    if (rightStationNumber) {
      setProcessedRightStationNumber(processStationNumber(rightStationNumber))
    } else {
      setProcessedRightStationNumber({})
    }
  }, [stationNumber])

  useEffect(() => {
    document.fonts.ready.then((fontFaceSet) => {
      const fontFaces = [...fontFaceSet]
      console.dir(fontFaces)
      console.log('All fonts have been loaded.')
      // setIsFontLoaded(true)
      setStageKey(prevKey => prevKey + 1)
    })
  }, [])

  const autoSpace = (str: string) => {
    return str.length <= 2 ? str.split('').join(' ') : str;
  }

  const getStationNameWidth = () => {
    const tempText = new Konva.Text({
      text: getSpacedStationName(),
      fontSize: 32,
      fontFamily: 'NotoSansJP',
      fontStyle: '900',
    });
    return tempText.getWidth()
  }

  return (
    <SignWrapper>
      <Stage width={width} height={height} ref={ref} key={stageKey}>
        <Layer>
          <Rect fill='white' x={0} y={0} width={width} height={height} />
          <Rect fill={baseColor} x={startingPoint} y={linePosY} width={width - 80} height={lineHeight} />
          <Line closed points={[startingPoint, linePosY, startingPoint, linePosY + lineHeight, 15, linePosY + 12]} fill={baseColor} />
          <Line closed points={[width - startingPoint, linePosY, width - startingPoint, linePosY + lineHeight, width - 15, linePosY + 12]} fill={baseColor} />
          {
            direction == 'left' &&
            <>
              <Rect fill={baseColor} x={startingPoint} y={linePosY} width={width} height={lineHeight} />
              <Text text={autoSpace(rightStationName)} width={width} x={-30} y={74} fontSize={15} fontStyle='400' fontFamily='NotoSansJP' fill='white' align='right' />
              <Text text={rightStationNameEnglish} width={width} x={-30} y={98} fontSize={13} fontFamily='OverusedGrotesk' fill='black' align='right' />
            </>
          }
          {
            direction == 'right' &&
            <>
              <Rect fill={baseColor} x={0} y={linePosY} width={width - 80} height={lineHeight} />
              <Text text={autoSpace(leftStationName)} width={width} x={30} y={74} fontSize={15} fontStyle='400' fontFamily='NotoSansJP' fill='white' align='left' />
              <Text text={leftStationNameEnglish} width={width} x={30} y={98} fontSize={13} fontFamily='OverusedGrotesk' fill='black' align='left' />
            </>
          }
          {
            (direction == 'left' || direction == 'both') &&
            <>
              <Text text={leftStationNameEnglish} width={width} x={64} y={98} fontSize={13} fontFamily='OverusedGrotesk' fill='black' align='left' />
            <Text text={autoSpace(leftStationName)} width={width} x={60} y={72} fontSize={21} fontStyle='400' fontFamily='NotoSansJP' fill='white' align='left' />
              {leftStationNumber &&
                <>
                  <Rect stroke={lineColor} strokeWidth={2} x={44} y={97} width={15} height={15} cornerRadius={2} />
                  <Text text={processedLeftStationNumber.prefix} fill='black' x={41.5} fontSize={6} fontFamily={'HindSemiBold'} fontStyle="600" y={99} width={20} height={30} align="center" />
                  <Text text={processedLeftStationNumber.number} fill='black' x={41.5} fontSize={9} fontFamily={'HindSemiBold'} fontStyle="600" y={104} width={20} height={32} align="center" />
                </>
              }
            </>
          }
          {
            (direction == 'both' || direction == 'right') &&
            <>
            <Text text={autoSpace(rightStationName)} width={width} x={-60} y={72} fontSize={21} fontStyle='400' fontFamily='NotoSansJP' fill='white' align='right' />
              <Text text={rightStationNameEnglish} width={width} x={-68} y={98} fontSize={13} fontFamily='OverusedGrotesk' fill='black' align='right' />
              {rightStationNumber &&
                <>
                  <Rect stroke={lineColor} strokeWidth={2} x={width - 60} y={97} width={15} height={15} cornerRadius={2} />
                  <Text text={processedRightStationNumber.prefix} fill='black' x={width - 62.5} fontSize={6} fontFamily={'HindSemiBold'} fontStyle="600" y={99} width={20} height={30} align="center" />
                  <Text text={processedRightStationNumber.number} fill='black' x={width - 62.5} fontSize={9} fontFamily={'HindSemiBold'} fontStyle="600" y={104} width={20} height={32} align="center" />
                </>
              }
            </>
          }
          <Rect stroke='grey' strokeWidth={8} x={0} y={0} width={width} height={height} />
          <Rect fill={lineColor} x={width / 2 - 12} y={70} width={24} height={24} />
          <Text text={getSpacedStationName()} width={width} x={0} y={16} fontSize={32} fontFamily='NotoSansJP' fontStyle="900" fill='black' align='center' />
          {processedStationNumber.prefix &&
            (stationThreeLetterCode ?
              (<>
                <Rect stroke={lineColor} strokeWidth={3} x={-45 + (width - getStationNameWidth()) / 2} y={29} width={30} height={30} cornerRadius={2} />
                <Rect stroke='black' strokeWidth={4} x={-48 + (width - getStationNameWidth()) / 2} y={25} width={36} height={37} cornerRadius={4} />
                <Rect stroke='black' strokeWidth={4} x={-48 + (width - getStationNameWidth()) / 2} y={26} width={36} height={36} cornerRadius={4} />
                <Rect stroke='black' strokeWidth={4} x={-48 + (width - getStationNameWidth()) / 2} y={22} width={36} height={40} cornerRadius={4} />
                <Rect stroke='black' strokeWidth={4} x={-48 + (width - getStationNameWidth()) / 2} y={18} width={36} height={44} cornerRadius={4} />
                <Text text={stationThreeLetterCode} fill='white' x={-45 + (width - getStationNameWidth()) / 2} fontSize={12} fontFamily={'HindSemiBold'} fontStyle="800" y={18} width={30} height={30} align="center" />
                <Text text={processedStationNumber.prefix} fill='black' x={-45 + (width - getStationNameWidth()) / 2} fontSize={11} fontFamily={'HindSemiBold'} fontStyle="600" y={33} width={30} height={30} align="center" />
                <Text text={processedStationNumber.number} fill='black' x={-45 + (width - getStationNameWidth()) / 2} fontSize={17} fontFamily={'HindSemiBold'} fontStyle="600" y={43} width={30} height={32} align="center" />
              </>
              )
              : (<>
                <Rect stroke={lineColor} strokeWidth={3} x={-45 + (width - getStationNameWidth()) / 2} y={18} width={30} height={30} cornerRadius={2} />
              <Text text={processedStationNumber.prefix} fill='black' x={-45 + (width - getStationNameWidth()) / 2} fontSize={11} fontFamily={'HindSemiBold'} fontStyle="600" y={22} width={30} height={30} align="center" />
              <Text text={processedStationNumber.number} fill='black' x={-45 + (width - getStationNameWidth()) / 2} fontSize={17} fontFamily={'HindSemiBold'} fontStyle="600" y={32} width={30} height={32} align="center" />
              </>)
            )
          }
          <Text text={stationNameFurigana} width={width} x={0} y={52} fontSize={12} fontStyle='800' fontFamily='NotoSansJP' fill='black' align='center' />
          <Text text={stationNameChinese} x={10 + (width + getStationNameWidth()) / 2} y={18} fontSize={10} fontStyle='400' fontFamily='NotoSansTC' fill='black' align='center' />
          <Text text={stationNameKorean} x={10 + (width + getStationNameWidth()) / 2} y={35} fontSize={10} fontStyle='400' fontFamily='NotoSansKR' fill='black' align='center' />
          <Text text={stationNameEnglish} width={width} x={0} y={98} fontSize={16} fontStyle='600' fontFamily='OverusedGrotesk' fill='black' align='center' />
        </Layer>
      </Stage>
    </SignWrapper>
  )
})

const SignWrapper = styled.div`
  width: 100%;
`

export default JrEastSign