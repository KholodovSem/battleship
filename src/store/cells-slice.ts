import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { isEqualCoordinates } from '@/helpers';
import { RowIndex, ColumnIndex } from '@/models/ShipCoordinates';
import { CellType } from '@/components/Cell';

const NUMBER_OF_CELLS_IN_ROW = 10;
const NUMBER_OF_CELLS_IN_COLUMN = 10;

interface Cell {
  coordinates: [RowIndex, ColumnIndex];
  type: CellType;
}

type CellsState = Cell[][];

const initialState: CellsState = Array.from(
  { length: NUMBER_OF_CELLS_IN_ROW },
  (_, rowIndex) =>
    Array.from({ length: NUMBER_OF_CELLS_IN_COLUMN }, (_, columnIndex) => {
      const INDEX_OFFSET = 1;

      const row = rowIndex + INDEX_OFFSET;
      const column = columnIndex + INDEX_OFFSET;

      return {
        coordinates: [row, column],
        type: CellType.EMPTY,
      };
    })
);

const cellsSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    changeCellType: (cells, { payload }: PayloadAction<Cell>) => {
      return cells.map(cellsArray =>
        cellsArray.map(cell => {
          const matchByCoordinates = isEqualCoordinates(
            cell.coordinates,
            payload.coordinates
          );

          if (matchByCoordinates) {
            return {
              ...cell,
              type: payload.type,
            };
          }

          return cell;
        })
      );
    },
  },
});

export const { changeCellType } = cellsSlice.actions;
export default cellsSlice.reducer;
