export interface AwairLatestData {
  timestamp: string,
  score: number,
  sensors: {
    camp: string,
    value: number
  }[],
  indices: {
    camp: string,
    value: number
  }[]
}