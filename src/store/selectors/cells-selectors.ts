import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { findShipByCoordinates } from '@/helpers';
import { selectShips } from '@/store/selectors/ships-selectors';

const selectCells = (state: RootState) => state.cells;

export const filteredCells = createSelector(
  [selectCells, selectShips],
  (cells, ships) =>
    cells.map(cellArray =>
      cellArray.filter(cell => !findShipByCoordinates(ships, cell.coordinates))
    )
);
