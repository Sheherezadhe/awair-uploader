import { AwairLatestData } from '../types/awair/latestData';
import { PlanetWatchDataPacket } from '../types/planetWatch/dataPacket';

const map = (sensorId: string, data: AwairLatestData): PlanetWatchDataPacket => {
  const response: PlanetWatchDataPacket = {
    deviceId: sensorId,
    ...(data.data[0])
  };
  return response;
};

export const AwairToPlanetWatchMapper = {
  map
};

