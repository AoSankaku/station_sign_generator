import { RefObject } from "react";
import Konva from "konva";

interface StationProps {
  //main
  stationName: string;
  stationNameFurigana: string;
  stationNote?: string;
  stationNameEnglish: string;
  stationNameKorean?: string;
  stationNameChinese?: string;
  //right
  rightStationName: string;
  rightStationNameEnglish: string;
  rightStationNameFurigana?: string;
  //left
  leftStationName: string;
  leftStationNameEnglish: string;
  leftStationNameFurigana?: string;
  //misc
  lineColor: string;
  baseColor: string;
  ratio: number;
  stationNumber?: string;
  direction?: 'left' | 'right' | 'both';
  ref: RefObject<Konva.Stage>;
}

export default StationProps