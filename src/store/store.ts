import { configureStore } from '@reduxjs/toolkit';
import shipsReducer from './ship-slice';
import cellReducer from './cells-slice';

export const store = configureStore({
  reducer: {
    ships: shipsReducer,
    cells: cellReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
