import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import RouteHelper from './components/appUtils/RouteHelper';
import MainPage from './pages/MainPage';
import { StoreType } from './store';
import { authorization } from './utils/authorization';
import Scheduler from './scheduler';
import { Sensors } from './types/planetWatch/sensors';
import './App.css';

interface HomePageProps {
  isReady: boolean
}

const App = (props: HomePageProps) => {
  if (!props.isReady) {
    return <div className='loading'>Loading...</div>;
  }

  if (authorization?.isAuthenticated() === false) {
    authorization?.login();
    return <><div className='loading'>Redirecting to Login</div></>;
  }

  const onComplete = (response: Sensors) => {
    console.log(response);
  };

  useEffect(() => {
    Scheduler.getInstance().loadPWSensorsList(onComplete);
    Scheduler.getInstance().start();
  }, []);

  return (
    <>
      <RouteHelper privateRoute={false}>
        <MainPage />
      </RouteHelper>
    </>
  );
};

export default connect(
  (state: StoreType) => ({
    isReady: state.auth.isReady,
  }),
)(App);
