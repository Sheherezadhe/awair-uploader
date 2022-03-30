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
      <div className='titleLog'>
        Logs
      </div>
      <div className='boxLog'>
        {
          data &&
          <div className='scroll'>
            {
              data.map((log, index) => (
                <div style={{ backgroundColor: index % 2 ? 'white' : 'rgba(211, 211, 211, 0.571)', paddingLeft: 10 }}>
                  {log}
                </div>
              ))
            }
          </div>
        }
      </div>
    </>
  );
};

export default Log;
