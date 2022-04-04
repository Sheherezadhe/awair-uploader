import React, { useEffect, useState } from 'react';
import AwairController from '../services/awairService';
import Scheduler, { AwairAccounts } from '../scheduler';
import { AwairDevice } from '../types/awair/devices';
import { Button, Input, Popover, Row, Col } from 'antd';
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
      <div className='card'>
      <h2 className='cardTitle'>Manage sensors</h2>
      <div className='cardBody'>
      <div className='cardSection'>  

      <h3>Add an Awair access token</h3>
      <p>Paste the access token from your Awair <a href="https://developer.getawair.com/" target="_blank" rel="noopener noreferrer">account</a> and press search.</p>

        <Search
          className='search'
          placeholder="Search"
          enterButton={true}
          disabled={loading}
          onSearch={onSearch}
          onChange={(e) => onJwtChange(e.target.value)} />
        </div>

        {
          error &&
          <div className='note note-error'>Error while getting the devices of this jwt: {error}</div>
        }

        <div className='cardSection flow'>  
        <h3>List of sensors for this token:</h3>
        <p>The following sensors are associated with this Awair token.</p>

        <ul className='items-list'>
          {
            devices.map((device, index ) => (
              <li className='list-item' key={device.deviceUUID}>
                {device.deviceUUID}
              </li>
            ))
          }
        </ul>
        <Button className='button' disabled={devices.length < 1} onClick={onAddAccount}>Use this token</Button>
        </div>

        <div className='cardSection flow'>
        <h3>List of added sensors:</h3>
        <p>The Air quality data from these sensors will be passed on to PlanetWatch.</p>

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
        <Button className='button' disabled={registeredAccounts.length < 1} onClick={onRemoveAllDevice}>Delete all sensors</Button>
        </div>
     
      </div>
      </div>
    </>

  );
};

export default ManageSensors;
