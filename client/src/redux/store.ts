import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducers';

export const setupStore = () =>
  configureStore({
    reducer,
  });

export type IAppState = ReturnType<typeof reducer>;
export type IAppStore = ReturnType<typeof setupStore>;
export type IAppDispatch = IAppStore['dispatch'];
