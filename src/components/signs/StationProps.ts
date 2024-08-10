import { RefObject } from "react";
import Konva from "konva";

interface StationProps {
  stationName: string;
  stationNameFurigana: string;
  stationNote?: string;
  stationNameEnglish: string;
  stationNameKorean?: string;
  stationNameChinese?: string;
  rightStationName: string;
  rightStationNameEnglish: string;
  leftStationName: string;
  leftStationNameEnglish: string;
  lineColor: string;
  baseColor: string;
  ratio: number;
  stationNumber?: string;
  direction?: 'left' | 'right' | 'both';
  ref: RefObject<Konva.Stage>;
}

export default StationProps