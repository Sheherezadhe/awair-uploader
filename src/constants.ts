export const constants = {
  awair: {
    getLatestData: 'https://developer-apis.awair.is/v1/users/self/devices/{device_type}/{device_id}/air-data/latest',
    getDevices: 'https://developer-apis.awair.is/v1/users/self/devices'
  },
  // Waiting for PW Specifications
  planetWatch: {
    sensors: '',
    sendData: '',
  },
  // Waiting for PW Specifications
  identityProvider: {
    url: '',
    realm: '',
    clientId: '',
    role: ''
  },
  routes: {
    home: '/main_window'
  },
  interval: 15 * 60 * 1000
};

export default constants;