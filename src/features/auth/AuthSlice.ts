import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Keycloak from 'keycloak-js';

import { AuthReducerType } from '../../types/redux/auth';


const initialState: AuthReducerType = {
  isReady: false,
  authenticated: false,
};

const Auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setReady: (state: AuthReducerType, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
    setAuthenticated: (state: AuthReducerType, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    }
  }
});

export default Auth.reducer;

export const {
  setReady,
  setAuthenticated
} = Auth.actions;