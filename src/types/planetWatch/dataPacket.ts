import { AwairDataPacket, AwairLatestData } from '../awair/latestData';

export interface PlanetWatchDataPacket extends AwairDataPacket {
  deviceId: string;
}