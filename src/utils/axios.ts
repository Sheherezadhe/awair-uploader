import { AxiosRequestConfig } from 'axios';
import { authorization } from './authorization';

export const AxiosRequestInterceptorProvider = (config: AxiosRequestConfig) => {
  const token = authorization.accessToken;

  if (token != null && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers = {
      Authorization: `Bearer ${token}`
    };
  }

  return config;
};