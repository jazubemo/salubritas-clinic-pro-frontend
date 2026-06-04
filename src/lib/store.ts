import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import counterReducer from './features/counter/counterSlice';
import authReducer from './features/auth/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      auth: authReducer,
    },
  });
};


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) => useSelector(selector);
export const useAppStore = () => useStore<AppStore>();

