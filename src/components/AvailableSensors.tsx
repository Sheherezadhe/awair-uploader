import React, { useEffect, useState } from 'react';
import Scheduler from '../scheduler';
import { Sensors } from '../types/planetWatch/sensors';
import './AvailableSensors.css';

const AvailableSensors = () => {
  const [sensors, setSensors] = useState<Sensors>([]);

  useEffect(() => {
    Scheduler.getInstance().loadPWSensorsList(() => { }).then((res) => {
      console.log(res);
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
            sensors && sensors.map((sensor, index) => (
              <div className='list' style={{ backgroundColor: index % 2 ? 'rgba(211, 211, 211, 0.571)' : 'transparent' }}>
                Sensor name
                {
                  // sensor.id??? Waiting for PW Specifications
                }
              </div>
            ))
          }
        </div>
    </>
  );
};

export default AvailableSensors;
