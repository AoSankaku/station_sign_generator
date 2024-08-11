import { useState, useEffect, forwardRef } from "react"
import StationProps from "./StationProps"

import { Rect, Layer, Stage, Text, Line } from 'react-konva'
import styled from 'styled-components'
import Konva from "konva"
import processStationNumber, { processedStationNumber } from "../../functions/processStationNumber"

const JrEastSign = forwardRef<Konva.Stage, StationProps>((props, ref: React.Ref<Konva.Stage>) => {

  //const stageRef = useRef<Konva.Stage>(null)

  const { stationName, stationNameEnglish, stationNameFurigana, stationNameChinese, stationNameKorean, stationNote, leftStationName, leftStationNameEnglish, rightStationName, rightStationNameEnglish, stationNumber, baseColor, lineColor, direction, ratio } = props
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

  const autoSpace = (str: string) => {
    return str.length <= 2 ? str.split('').join(' ') : str;
  }

  const getStationNameWidth = () => {
    const tempText = new Konva.Text({
      text: getSpacedStationName(),
      fontSize: 32,
      fontFamily: 'Noto Sans Japanese',
    });
    return tempText.getWidth()
  }

  return (
    <SignWrapper>
      <Stage width={width} height={height} ref={ref}>
        <Layer>
          <Rect fill='white' x={0} y={0} width={width} height={height} />
          <Rect fill={baseColor} x={startingPoint} y={linePosY} width={width - 80} height={lineHeight} />
          <Line closed points={[startingPoint, linePosY, startingPoint, linePosY + lineHeight, 15, linePosY + 12]} fill={baseColor} />
          <Line closed points={[width - startingPoint, linePosY, width - startingPoint, linePosY + lineHeight, width - 15, linePosY + 12]} fill={baseColor} />
          {
            direction == 'left' &&
            <>
              <Rect fill={baseColor} x={startingPoint} y={linePosY} width={width} height={lineHeight} />
              <Text text={autoSpace(rightStationName)} width={width} x={-30} y={74} fontSize={15} fontStyle='500' fontFamily='Noto Sans Japanese' fill='white' align='right' />
              <Text text={autoSpace(rightStationNameEnglish)} width={width} x={-30} y={100} fontSize={12} fontStyle='300' fontFamily='Helvetica Neue' fill='black' align='right' />
            </>
          }
          {
            direction == 'right' &&
            <>
              <Rect fill={baseColor} x={0} y={linePosY} width={width - 80} height={lineHeight} />
              <Text text={autoSpace(leftStationName)} width={width} x={30} y={74} fontSize={15} fontStyle='500' fontFamily='Noto Sans Japanese' fill='white' align='left' />
              <Text text={autoSpace(leftStationNameEnglish)} width={width} x={30} y={100} fontSize={12} fontStyle='300' fontFamily='Helvetica Neue' fill='black' align='left' />
            </>
          }
          {
            (direction == 'left' || direction == 'both') &&
            <Text text={autoSpace(leftStationName)} width={width} x={60} y={72} fontSize={21} fontStyle='500' fontFamily='Noto Sans Japanese' fill='white' align='left' />
          }
          {
            (direction == 'both' || direction == 'right') &&
            <Text text={autoSpace(rightStationName)} width={width} x={-60} y={72} fontSize={21} fontStyle='500' fontFamily='Noto Sans Japanese' fill='white' align='right' />
          }
          <Rect stroke='grey' strokeWidth={8} x={0} y={0} width={width} height={height} />
          <Rect fill={lineColor} x={width / 2 - 12} y={70} width={24} height={24} />
          <Text text={getSpacedStationName()} width={width} x={0} y={14} fontSize={32} fontStyle='600' fontFamily='Noto Sans Japanese' fill='black' align='center' />
          {processedStationNumber.prefix &&
            <>
              <Rect stroke={lineColor} strokeWidth={4} x={-45 + (width - getStationNameWidth()) / 2} y={15} width={30} height={33} cornerRadius={6} />
              <Text text={processedStationNumber.prefix} fill='black' x={-45 + (width - getStationNameWidth()) / 2} fontSize={10} fontFamily='Helvetica Neue' y={20} width={30} height={30} align="center" />
              <Text text={processedStationNumber.number} fill='black' x={-45 + (width - getStationNameWidth()) / 2} fontSize={16} fontFamily='Helvetica Neue' fontStyle="500" y={29} width={30} height={32} align="center" />
            </>
          }
          <Text text={stationNameFurigana} width={width} x={0} y={52} fontSize={12} fontStyle='600' fontFamily='Noto Sans Japanese' fill='black' align='center' />
          <Text text={stationNameChinese} x={10 + (width + getStationNameWidth()) / 2} y={18} fontSize={10} fontStyle='400' fontFamily='Noto Sans' fill='black' align='center' />
          <Text text={stationNameKorean} x={10 + (width + getStationNameWidth()) / 2} y={34} fontSize={10} fontStyle='400' fontFamily='Noto Sans' fill='black' align='center' />
          <Text text={stationNameEnglish} width={width} x={0} y={100} fontSize={14} fontStyle='600' fontFamily='Helvetica Neue' fill='black' align='center' />
        </Layer>
      </Stage>
    </SignWrapper>
  )
})

const SignWrapper = styled.div`
  width: 100%;
`

export default JrEastSign