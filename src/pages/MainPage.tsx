import React from 'react';
import Log from '../components/Log';
import AvailableSensors from '../components/AvailableSensors';
import ManageSensors from '../components/ManageSensors';
import Status from '../components/Status';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import './MainPage.css';
import LogoutButton from '../components/app/LogoutButton';

const MainPage = () => {
  return (
    <div className="site-card-border-less-wrapper">
      <Row  gutter={16}>
        <Col span={8}>
          <ManageSensors />
        </Col>
        <Col span={8}>
          <Status />
          <AvailableSensors />
        </Col>
        <Col span={8}>
          <Log />
          <div>
        <LogoutButton />
      </div>
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
