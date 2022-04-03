import React, { useEffect, useState } from 'react';
import Scheduler, { Statuses } from '../scheduler';
import MyTimeAgo from 'react-timeago';
import './Status.css';

const Status = () => {
  const [data, setData] = useState<Statuses>();

  const printData = (info: Statuses) => {
    setData(info);
  };

  const renderStatuses = () => {
    const result = [];
    for (const [key, value] of Object.entries(data)) {
      result.push({ name: key, receivedAt: value.receivedAt, calledAt: value.calledAt });
    }
    return (
      <div>
        {
          result.map((element, index) => (
            <div key={index}>
              {element.calledAt !== '' && element.receivedAt !== '' &&
                <div>
                  {element.name}: <MyTimeAgo date={new Date(element.calledAt)}/> - <MyTimeAgo  date={new Date(element.receivedAt)}/>
                </div>
              }
            </div>
          ))
        }
      </div>
    );
  };

  useEffect(() => {
    Scheduler.getInstance().addStatusSubscriber(printData);
  }, []);

  return (
    <>
      <p className='titleStatus'>
        Sensor Status
      </p>
      <div className='table'>
        <div>Name</div>
        <div className='call'>Last Call</div>
        <div className='data'>Last Data</div>
      </div>
      <div className='boxStatus'>
        {
          data && renderStatuses()
        }
      </div>
    </>
  );
};

export default Status;
