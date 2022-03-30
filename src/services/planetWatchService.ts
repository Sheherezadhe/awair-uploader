import axios from 'axios';
import constants from '../constants';
import { Sensors } from '../types/planetWatch/sensors';
import { PlanetWatchDataPacket } from '../types/planetWatch/dataPacket';

const getSensors = async () => {
  const main = constants.planetWatch.sensors;

  const response = await axios.get<Sensors>(main);

  return response.data;
};

const sendData = async (data: PlanetWatchDataPacket) => {
  const main = constants.planetWatch.sensors;

  const response = await axios.post(main, data);

  return response.data;
};

const PlanetWatchService = {
  getSensors,
  sendData
};

export default PlanetWatchService;