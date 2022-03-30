import { Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { StoreType } from '../../store';
import { authorization } from '../../utils/authorization';
import './LogoutButton.css';

const LogoutButton = ({ authenticated }: { authenticated: boolean }) => {
  return (<>
    {authenticated &&
      <Button className='logout' onClick={() => authorization?.logout()}>
        Logout
      </Button>
    }
  </>);
};

export default connect(
  (state: StoreType) => ({
    authenticated: state.auth.authenticated,
  }),
)(LogoutButton);