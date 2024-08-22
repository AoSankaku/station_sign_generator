import { RefObject } from "react";
import Konva from "konva";

type StationArea = {
  id: string;
  name: string;
  isWhite?: boolean;
}

export type Direction = 'left' | 'right' | 'both';


interface DirectInputStationProps {
  //main
  stationName: string;
  stationNameFurigana: string;
  stationNote?: string;
  stationNameEnglish: string;
  stationNameKorean?: string;
  stationNameChinese?: string;
  stationNumber?: string[];
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
  direction?: Direction;
  ref?: RefObject<Konva.Stage>;
}

export default DirectInputStationProps