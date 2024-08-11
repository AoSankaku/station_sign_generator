const processStationNumber = (stationNumber: string): processedStationNumber => {

  const stationNumberWithoutSpace = stationNumber.replace(/\s+/g, "")
  const match = stationNumberWithoutSpace.match(/^([A-Za-z]+)(\d+)$/);
  if (match) {
    return {
      prefix: match[1],
      number: match[2],
    };
  } else {
    console.error("Invalid input format for processStationNumber()")
    return { prefix: stationNumberWithoutSpace }
  }

}

interface processedStationNumber {
  prefix?: string;
  number?: string;
}

export type { processedStationNumber }
export default processStationNumber