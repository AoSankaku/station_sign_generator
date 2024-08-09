import { useState, useEffect, useRef, forwardRef } from "react"
import StationProps from "./StationProps"

import { Rect, Layer, Stage, Text, Line } from 'react-konva'
import styled from 'styled-components'
import Konva from "konva"

const JrEastSign: React.FC<StationProps> = (props) => {
  const { stationName, stationNameEnglish, stationNameFurigana, stationNameChinese, stationNameKorean, stationNote, leftStationName, leftStationNameEnglish, rightStationName, rightStationNameEnglish, stationNumber, baseColor, lineColor, direction, ratio } = props

  const height = 130;
  const [width, setWidth] = useState(0);
  const startingPoint = 40;
  const lineHeight = 24
  const linePosY = 70
  const stageRef = useRef<Konva.Stage>(null)

  const handleSave = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      // Create a link element
      const link = document.createElement('a');
      link.download = 'canvas.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('handleSave failed. This is completely unexpected behavior as the canvas is always rendered.')
    }
  };

  useEffect(() => {
    setWidth(height * ratio);
  }, [ratio])

  const autoSpace = (str: string) => {
    return str.length <= 2 ? str.split('').join(' ') : str;
  }
  const autoSpaceMain = (str: string) => {
    switch (str.length) {
      case 2: return str.split('').join('　')
      case 3: return str.split('').join(' ')
      default: return str
    }
  }

  return (
    <SignWrapper>
      <Stage width={width} height={height} ref={stageRef}>
        <Layer>
          <Rect fill='white' x={0} y={0} width={width} height={height} />
          <Rect fill={baseColor} x={startingPoint} y={linePosY} width={width - 80} height={lineHeight} />
          {
            direction == 'left' &&
            <>
              <Rect fill={baseColor} x={startingPoint} y={linePosY} width={width} height={lineHeight} />
              <Text text={autoSpace(rightStationName)} width={width} x={-60} y={74} fontSize={16} fontStyle='500' fontFamily='Noto Sans Japanese' fill='white' align='right' />
            </>
          }
          {
            direction == 'right' &&
            <>
              <Rect fill={baseColor} x={0} y={linePosY} width={width - 80} height={lineHeight} />
              <Text text={autoSpace(leftStationName)} width={width} x={60} y={74} fontSize={16} fontStyle='500' fontFamily='Noto Sans Japanese' fill='white' align='left' />
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
          <Line closed points={[startingPoint, linePosY, startingPoint, linePosY + lineHeight, 15, linePosY + 12]} fill={baseColor} />
          <Line closed points={[width - startingPoint, linePosY, width - startingPoint, linePosY + lineHeight, width - 15, linePosY + 12]} fill={baseColor} />
          <Rect stroke='grey' strokeWidth={8} x={0} y={0} width={width} height={height} />
          <Rect fill={lineColor} x={width / 2 - 12} y={70} width={24} height={24} />
          <Text text={autoSpaceMain(stationName)} width={width} x={0} y={12} fontSize={35} fontStyle='600' fontFamily='Noto Sans Japanese' fill='black' align='center' />
          <Text text={stationNameFurigana} width={width} x={0} y={52} fontSize={13} fontStyle='600' fontFamily='Noto Sans Japanese' fill='black' align='center' />
          <Text text={stationNameEnglish} width={width} x={0} y={100} fontSize={14} fontStyle='600' fontFamily='Helvetica' fill='black' align='center' />
        </Layer>
      </Stage>
      <button onClick={handleSave}>Save</button>
    </SignWrapper>
  )
}

const SignWrapper = styled.div`
  width: 100%;
`

export default JrEastSign