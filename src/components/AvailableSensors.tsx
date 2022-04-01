import React, { useEffect, useState } from 'react';
import Scheduler from '../scheduler';
import { Sensors } from '../types/planetWatch/sensors';
import './AvailableSensors.css';

const AvailableSensors = () => {
  const [sensors, setSensors] = useState<Sensors>(undefined);

  useEffect(() => {
    Scheduler.getInstance().loadPWSensorsList(() => { }).then((res) => {
      setSensors(res);
    });
  }, []);


  return (
    <>
      <p className='titleAvailable'>
        Available PW Sensors
      </p>
      <div className='boxAvailable'>
        {
          sensors && sensors.data
            .filter((sensor) => sensor.sensorId.includes('awair-element'))
            .map((sensor, index) => (
              <div key={index} className='list' style={{ backgroundColor: index % 2 ? 'rgba(211, 211, 211, 0.571)' : 'transparent' }}>
                {
                  sensor.sensorId
                }
              </div>
            ))
        }
      </div>
    </>
  );
};

export default AvailableSensors;
