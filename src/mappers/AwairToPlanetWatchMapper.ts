import { AwairLatestData } from '../types/awair/latestData';
import { PlanetWatchDataPacket } from '../types/planetWatch/dataPacket';

const map = (sensorId: string, data: AwairLatestData): PlanetWatchDataPacket => {
  // Waiting for PW Specifications
  const response: PlanetWatchDataPacket = {
    
  };

  return response;
};

export const AwairToPlanetWatchMapper = {
  map
};

