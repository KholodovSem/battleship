import type { MouseEvent } from 'react';
import type { ShipCoordinates } from '@/models';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks';
import { selectShipsOnBoard } from '@/store/selectors/ships-selectors';
import { filteredCells } from '@/store/selectors/cells-selectors';
import { changeCellType } from '@/store/cells-slice';
import { CELL_DATA_TYPE } from '@/utils';
import { BorderSide } from '@/components/BorderSide';
import { Cell, CellType } from '@/components/Cell';
import { ShipComponent } from '@/components/ShipComponent';

const NUMERIC_SIDE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ALPHABETIC_SIDE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

export const Board = () => {
  const cells = useSelector(filteredCells);
  const shipsOnBoard = useSelector(selectShipsOnBoard);
  const dispatch = useAppDispatch();

  const boardWrapperStyle =
    'relative w-full h-screen flex items-center justify-center';
  const boardStyle =
    'relative w-full h-full max-w-[600px] max-h-[600px] grid grid-cols-[repeat(10,1fr)] gap-[1px]';

  //We using event delegation for click handling
  const handleBoardClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const cell = target.closest(
      `[data-type="${CELL_DATA_TYPE}"]`
    ) as HTMLDivElement; //about closest method https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

    if (!cell) return;

    //getAttribute return string, we need parse it to number
    const cellType = cell.getAttribute('data-cell-type');
    const rowIndex = parseInt(cell.getAttribute('data-row-index')!);
    const columnIndex = parseInt(cell.getAttribute('data-column-index')!);
    const coordinates: ShipCoordinates = [rowIndex, columnIndex];

    if (cellType === CellType.MISS) return;

    dispatch(changeCellType({ coordinates, type: CellType.MISS }));
  };

  return (
    <div className={boardWrapperStyle}>
      <div className={boardStyle} onClick={handleBoardClick}>
        <BorderSide items={NUMERIC_SIDE} position="top" />
        <BorderSide items={ALPHABETIC_SIDE} position="left" />
        {cells.map(cellsArray =>
          cellsArray.map(cell => {
            const [row, column] = cell.coordinates;

            return (
              <Cell
                key={`${row}-${column}`}
                type={cell.type}
                row={row}
                column={column}
                data-type={CELL_DATA_TYPE}
                data-row-index={row}
                data-column-index={column}
                data-cell-type={cell.type}
              />
            );
          })
        )}
        {shipsOnBoard.map(ship => {
          const { id, coordinates } = ship;

          const GRID_OFFSET = 1;

          const [startShipRowIndex, startRowColumnIndex] = coordinates[0];
          const [endShipRowIndex, endRowColumnIndex] =
            coordinates[coordinates.length - 1];

          return (
            <div
              key={id}
              style={{
                gridRow: `${startShipRowIndex} / ${
                  endShipRowIndex + GRID_OFFSET
                }`,
                gridColumn: `${startRowColumnIndex} / ${
                  endRowColumnIndex + GRID_OFFSET
                }`,
              }}
            >
              <ShipComponent ship={ship} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
