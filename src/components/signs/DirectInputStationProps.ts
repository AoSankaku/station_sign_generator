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
  stationNumberPrimary?: string;
  stationNumberSecondary?: string;
  stationThreeLetterCode?: string;
  stationArea?: StationArea[];
  //right
  rightStationName: string;
  rightStationNameEnglish: string;
  rightStationNameFurigana?: string;
  rightStationNumberPrimary?: string;
  rightStationNumberSecondary?: string;
  //left
  leftStationName: string;
  leftStationNameEnglish: string;
  leftStationNameFurigana?: string;
  leftStationNumberPrimary?: string;
  leftStationNumberSecondary?: string;
  //misc
  lineColor: string;
  baseColor: string;
  ratio: number;
  direction?: Direction;
  ref?: RefObject<Konva.Stage>;
}

export default DirectInputStationProps