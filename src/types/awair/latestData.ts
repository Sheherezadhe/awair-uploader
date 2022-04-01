export interface AwairDataPacket {
  timestamp: string;
  score: number;
  sensors: {
    comp: string;
    value: number;
  }[];
  indices: {
    comp: string;
    value: number;
  }[];
}

export interface AwairLatestData {
  data: AwairDataPacket[];
}