import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/AuthSlice';
import { AuthReducerType } from './types/redux/auth';

export interface StoreType {
  auth: AuthReducerType;
}

const store = configureStore<StoreType>({
  reducer: {
    auth: authReducer
  }
});

export default store;