const processStationNumber = (stationNumber: string): processedStationNumber => {

  const match = stationNumber.replace(/\s+/g, "").match(/^([A-Za-z]+)(\d+)$/);
  if (match) {
    return {
      prefix: match[1],
      number: match[2],
    };
  } else {
    console.error("Invalid input format for processStationNumber()")
    return {}
  }

}

interface processedStationNumber {
  prefix?: string;
  number?: string;
}

export type { processedStationNumber }
export default processStationNumber