import Line from "./Lines";

type StationArea = {
  id: number;
  name: string;
  isWhite?: boolean;
}

// inside of station
type Platform = {
  id: string;
  number: number;
  lineColor: string[];
}

interface StationProps {
  //main
  id: string;
  name: string;
  nameFurigana: string;
  note?: string;
  nameEnglish: string;
  nameKorean?: string;
  nameChinese?: string;
  number?: string[];
  threeLetterCode?: string;
  area?: StationArea[];
  platforms?: Platform[];
}

export default StationProps