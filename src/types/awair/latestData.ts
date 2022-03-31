export interface AwairLatestData {
  timestamp: string,
  score: number,
  sensors: {
    comp: string,
    value: number
  }[],
  indices: {
    comp: string,
    value: number
  }[]
}
