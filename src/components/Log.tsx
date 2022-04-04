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
      <div className='cardBody cardBody-nopadding'>
        {
          data &&
          <div className='logs scroll'>
            {
              data.map((log, index) => (
                <div key={index} className="log-item" style={{ backgroundColor: index % 2 ? 'white' : 'rgba(211, 211, 211, 0.571)' }}>
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
