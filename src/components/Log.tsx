import React, { useEffect, useState } from 'react';
import Scheduler from '../scheduler';
import './Log.css';

const Log = () => {
  const [data, setData] = useState<string[]>();

  const printData = (info: string[]) => {
    setData(info);
  };

  useEffect(() => {
    Scheduler.getInstance().addLogSubscriber(printData);
  }, []);


  return (
    <>
      <div className="card">
      <h2 className='cardTitle'>Logs</h2>
      <div className='cardBody'>
        {
          data &&
          <div className='items-list scroll'>
            {
              data.map((log, index) => (
                <div key={index} className="list-item">
                  {log}
                </div>
              ))
            }
          </div>
        }
      </div>
      </div>
    </>
  );
};

export default Log;
