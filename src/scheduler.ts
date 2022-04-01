import AwairController from './services/awairService';
import PlanetWatchService from './services/planetWatchService';
import { AwairDevice } from './types/awair/devices';
import { Sensors } from './types/planetWatch/sensors';
import { DateTime } from 'luxon';
import { AwairToPlanetWatchMapper } from './mappers/AwairToPlanetWatchMapper';
import constants from './constants';
export interface AwairAccount {
  jwt: string;
  devices: AwairDevice[];
}

export type AwairAccounts = AwairAccount[];

export interface Statuses {
  [key: string]: {
    calledAt: string;
    receivedAt: string;
  }
}

export class Scheduler {

  private static instance: Scheduler;

  private accounts: AwairAccounts;  // All Awair accounts with jwt and devices

  private planetWatchRegisteredSensorsPromise: Promise<Sensors>;
  private planetWatchRegisteredSensors: Sensors;

  private scheduler: NodeJS.Timer;

  private logSubscribers: ((args: string[]) => unknown)[];
  private statusSubscribers: ((args: Statuses) => unknown)[];
  private logs: string[];
  private statuses: Statuses;

  constructor() {
    if (!Scheduler.instance) {
      Scheduler.instance = this;
    }
    this.accounts = [];
    this.logSubscribers = [];
    this.statusSubscribers = [];
    this.logs = [];
    this.statuses = {};
    this.loadAwairAccountsFromLocalStorage();
  }

  public static getInstance() {
    return this.instance;
  }

  // Getters

  public getAccounts() {
    return this.accounts;
  }

  public async getPlanetWatchRegisteredSensors() {
    const ready = await this.isReady();
    if (ready) {
      return this.planetWatchRegisteredSensors;
    }
  }

  // Private methods

  private async isReady() {
    try {
      await this.planetWatchRegisteredSensorsPromise;
      if (this.planetWatchRegisteredSensors !== undefined) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  }

  private saveAwairAccountsToLocalStorage() {
    // Overwrite the accounts on the local storage
    try {
      window.localStorage.setItem('accounts', JSON.stringify(this.accounts));
    } catch (error) {
      console.error('saveAwairAccountsToLocalStorage: Unable to write the subscriptions');
    }
  }

  private loadAwairAccountsFromLocalStorage() {
    try {
      const storedAccounts = window.localStorage.getItem('accounts');
      if (storedAccounts && storedAccounts !== '') {
        this.accounts = JSON.parse(storedAccounts);
      }
    } catch (error) {
      console.error('loadAwairAccountsFromLocalStorage: Unable to autoLoad the subscriptions');
    }
  }

  // Public methods

  public removeAllSubscriptions() {
    this.accounts = [];
    this.saveAwairAccountsToLocalStorage();
    return [...this.accounts];
  }

  public async addSubscription(account: AwairAccount) {
    const ready = await this.isReady();
    if (ready) {
      if (this.accounts.find((localAccount) => localAccount.jwt === account.jwt) === undefined) {
        const deviceRegistered: AwairDevice[] = [];

        account.devices.forEach((device) => {
          // Check if the sensor is registered on PW systems and then push
          if (this.planetWatchRegisteredSensors.data.findIndex((localDevice) => localDevice.sensorId === device.deviceUUID) !== -1) {
            deviceRegistered.push(device);
          }
        });

        if (deviceRegistered.length > 0) {
          this.accounts.push({ jwt: account.jwt, devices: deviceRegistered });
          this.saveAwairAccountsToLocalStorage();
        }
      }
    }
    this.reset();
    return [...this.accounts];
  }

  public removeSubscription(device: AwairDevice) {
    let accountToRemove: AwairAccount;

    this.accounts.forEach((account) => {
      const index = account.devices.indexOf(device);
      if (index !== -1) {
        account.devices.splice(index, 1);

        if (account.devices.length === 0) {
          accountToRemove = account;
        }
      }
    });

    if (accountToRemove) {
      this.accounts.splice(this.accounts.findIndex((account) => account === accountToRemove), 1);
    }

    this.saveAwairAccountsToLocalStorage();
    return [...this.accounts];
  }

  // Auxiliary method
  public async loadPWSensorsList(callback: (arg: Sensors) => unknown) {
    if (this.planetWatchRegisteredSensorsPromise === undefined) {
      this.planetWatchRegisteredSensorsPromise = PlanetWatchService.getSensors();
      this.planetWatchRegisteredSensorsPromise.then((res) => {
        this.planetWatchRegisteredSensors = res;
        callback(res);
      })
        .catch((err) => console.log(err));
    }
    const ready = await this.isReady();
    if (ready) {
      return this.planetWatchRegisteredSensors;
    }
  }

  private async fetchAndSendData(accounts: AwairAccounts) {
    // Grab all the data from awair and save them in a structure
    accounts  .forEach((account) => {
      const jwt = account.jwt;

      account.devices.forEach((device) => {
        const deviceType = device.deviceType;
        const deviceId = device.deviceId;
        this.statuses[device.deviceUUID] = {
          calledAt: DateTime.now().toISO(),
          receivedAt: ''
        };

        AwairController.getLatestData(jwt, deviceType, deviceId)
          .then((res) => {
            PlanetWatchService.sendData(AwairToPlanetWatchMapper.map(device.deviceUUID, res))
              .catch((err) => console.log(err));
            this.statuses[device.deviceUUID].receivedAt = DateTime.now().toISO();
            this.statusSubscribers.forEach((callback) => callback({ ...this.statuses }));
            this.logs.push(DateTime.now().toFormat('[HH:mm:ss]') + ' - Retrieving data from ' + deviceId + '\n');
            this.logSubscribers.forEach((callback) => callback([...this.logs]));
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }

  public start() {
    this.fetchAndSendData(this.accounts);
    this.scheduler = setInterval(() => this.fetchAndSendData(this.accounts), constants.interval);
  }

  public stop() {
    clearInterval(this.scheduler);
  }

  public reset() {
    this.stop();
    this.start();
  }

  public addLogSubscriber(callback: (arg: string[]) => unknown) {
    this.logSubscribers.push(callback);
  }

  public addStatusSubscriber(callback: (arg: Statuses) => unknown) {
    this.statusSubscribers.push(callback);
  }

}

export default Scheduler;

export const scheduler = new Scheduler();