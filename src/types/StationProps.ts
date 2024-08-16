import Line from "./Lines";

type StationArea = {
  id: number;
  name: string;
  isWhite?: boolean;
}

type Platform = {
  number: number;
  lineColor: string[];
}

interface StationProps {
  //main
  name: string;
  nameFurigana: string;
  note?: string;
  nameEnglish: string;
  nameKorean?: string;
  nameChinese?: string;
  line?: Line[];
  number?: string[];
  threeLetterCode?: string;
  area?: StationArea[];
  platforms?: number;
}

export default StationProps