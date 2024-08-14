import { RefObject } from "react";
import Konva from "konva";

type StationArea = {
  id: number;
  name: string;
  isWhite?: boolean;
}

interface StationProps {
  //main
  stationName: string;
  stationNameFurigana: string;
  stationNote?: string;
  stationNameEnglish: string;
  stationNameKorean?: string;
  stationNameChinese?: string;
  stationNumber?: string;//string[]
  stationThreeLetterCode?: string;
  stationArea?: StationArea[];
  //right
  rightStationName: string;
  rightStationNameEnglish: string;
  rightStationNameFurigana?: string;
  rightStationNumber?: string;
  //left
  leftStationName: string;
  leftStationNameEnglish: string;
  leftStationNameFurigana?: string;
  leftStationNumber?: string;
  //misc
  lineColor: string;
  baseColor: string;
  ratio: number;
  direction?: 'left' | 'right' | 'both';
  ref?: RefObject<Konva.Stage>;
}

export default StationProps