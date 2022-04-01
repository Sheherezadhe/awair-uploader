import React, { useEffect, useState } from 'react';
import AwairController from '../services/awairService';
import Scheduler, { AwairAccounts } from '../scheduler';
import { AwairDevice } from '../types/awair/devices';
import { Button, Input } from 'antd';
import './ManageSensors.css';

const { Search } = Input;

const ManageSensors = () => {
  const [tempJwt, setTempJwt] = useState<string>();
  const [devices, setDevices] = useState<AwairDevice[]>([]);

  const [registeredAccounts, setRegisteredAccounts] = useState<AwairAccounts>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(undefined);

  useEffect(() => {
    setRegisteredAccounts(Scheduler.getInstance().getAccounts());
  }, []);

  const onAddAccount = async () => {
    setRegisteredAccounts(await Scheduler.getInstance().addSubscription({ jwt: tempJwt, devices }));
  };

  const onJwtChange = (jwt: string) => {
    setDevices([]);
    setTempJwt(jwt);
  };

  const onSearch = () => {
    setLoading(true);
    AwairController.getDevices(tempJwt)
      .then((res) => {
        setError(undefined);
        setDevices(res.devices);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRemoveDevice = (device: AwairDevice) => {
    setRegisteredAccounts(Scheduler.getInstance().removeSubscription(device));
  };

  const onRemoveAllDevice = () => {
    setRegisteredAccounts(Scheduler.getInstance().removeAllSubscriptions());
  };

  return (
    <>
      <p className='TitleManage'>Manage sensors</p>
      <div className='card'>
      <div className='firstTitle'>Add sensor</div>
        <Search
          className='search'
          placeholder="Search"
          enterButton={true}
          disabled={loading}
          onSearch={onSearch}
          onChange={(e) => onJwtChange(e.target.value)} />
        <div className='title'>List of sensors in this token:</div>

        <div className='box'>
          {
            devices.map((device, index ) => (
              <div key={device.deviceUUID} style={{ backgroundColor: index % 2 ? 'white' : 'transparent', paddingLeft: 5 }}>
                {device.deviceUUID}
              </div>
            ))
          }
        </div>
        <Button className='button' disabled={devices.length < 1} onClick={onAddAccount}>Add your token</Button>
        <div className='title'>List of added sensors:</div>
        <div className='sensorList'>
          {
            registeredAccounts.map((account, index) => (
              <div key={index}>
                {
                  account.devices.map((device, index2) => (
                    <div key={index2} style={{ backgroundColor: index % 2 ? 'white' : 'transparent', padding: 5, display: 'flex' }}>
                      <div className='deleteButton' onClick={() => onRemoveDevice(device)}>x</div>
                      {
                        device.deviceUUID
                      }
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
        <Button className='button' disabled={registeredAccounts.length < 1} onClick={onRemoveAllDevice}>Delete All sensors</Button>
        {
          error &&
          <div>Error while getting the devices of this jwt: {error}</div>
        }
      </div>
    </>

  );
};

export default ManageSensors;
