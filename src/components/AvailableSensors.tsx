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
      <div className="card">
        <h2 className='cardTitle'>Available PW Sensors</h2>
        <div className='cardBody'>
        <div className='cardSection'>
        <p>These are the available sensors associated with this PlanetWatch account.</p>
          <ul className='items-list'>
          {
            sensors && sensors.data
              .filter((sensor) => sensor.sensorId.includes('awair-element'))
              .map((sensor, index) => (
                <li key={index} className='list-item'>
                  {
                    sensor.sensorId
                  }
                </li>
              ))
          }
          </ul>
        </div>
        </div>
      </div>
    </>
  );
};

export default AvailableSensors;
