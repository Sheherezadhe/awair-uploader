import axios, { AxiosRequestConfig } from 'axios';
import { AwairLatestData } from '../types/awair/latestData';
import constants from '../constants';
import { AwairDevices } from '../types/awair/devices';

const awairAxios = axios.create();

const getLatestData = async (jwt: string, deviceType: string, deviceId: number) => {
  const main = constants.awair.getLatestData.replace('{device_type}', deviceType).replace('{device_id}', deviceId.toString());

  const config: AxiosRequestConfig = {
    headers: {
      authorization: `Bearer ${jwt}`
    }
  };

  const response = await awairAxios.get<AwairLatestData>(main, config);
  
  return response.data;
};

const getDevices = async (jwt: string) => {
  const main = constants.awair.getDevices;

  const config: AxiosRequestConfig = {
    headers: {
      authorization: `Bearer ${jwt}`
    }
  };

  const response = await awairAxios.get<AwairDevices>(main, config);

  return response.data;
};

const AwairController = {
  getLatestData,
  getDevices
};

export default AwairController;