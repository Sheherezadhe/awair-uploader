export interface AwairDevice {
  name: string,
  latitude: number,
  preference: string,
  timezone: string,
  roomType: string,
  deviceType: string,
  longitude: number,
  spaceType: string,
  deviceUUID: string,
  deviceId: number,
  locationName: string
}

export interface AwairDevices {
  devices: AwairDevice[]
}