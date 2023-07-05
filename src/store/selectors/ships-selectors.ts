import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export const selectShips = (state: RootState) => state.ships;

export const selectShipsInHarbor = createSelector([selectShips], ships =>
  ships.filter(ship => ship.location === 'Harbor')
);
export const selectShipsOnBoard = createSelector([selectShips], ships =>
  ships.filter(ship => ship.location === 'Board')
);
