export const constants = {
  awair: {
    getLatestData: 'https://developer-apis.awair.is/v1/users/self/devices/{device_type}/{device_id}/air-data/latest',
    getDevices: 'https://developer-apis.awair.is/v1/users/self/devices'
  },
  planetWatch: {
    sensors: 'https://wearableapi.planetwatch.io/api/sensors',
    sendData: 'https://wearableapi.planetwatch.io/api/data/devicedata',
  },
  identityProvider: {
    url: 'https://login.planetwatch.io/auth',
    realm: 'Planetwatch',
    clientId: 'external-login',
    role: ''
  },
  routes: {
    home: '/main_window'
  },
  interval: 15 * 60 * 1000
};

export default constants;