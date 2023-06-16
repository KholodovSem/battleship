import { useState, type MouseEvent } from 'react';
import { Cell, CellType } from '@/components/Cell';
import { BorderSide } from '@/components/BorderSide';
import battleFieldGenerate from '@/helpers/battleFieldGenerate';
const BOARD_HEIGHT = 10;
const BOARD_WIDTH = 10;
const CELL_TYPE_IN_HTML = 'board-cell';

const NUMERIC_SIDE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const ALPHABETIC_SIDE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/* 
Number of ships

Huge ship - 1;
Big ship - 2;
Medium ship - 3;
Small ship - 4;

TOTAL = 10;
*/

//Huge ship takes 4 cells
//Big ship takes 3 cells
//Medium ship takes 2 cells
//Small ship takes 1 cells
type ShipType = 'Huge ship' | 'Big ship' | 'Medium ship' | 'Small ship';

//Possible orientation is "Horizontal" or "Vertical"
type ShipOrientation = 'horizontal' | 'vertical';

//Actually it's cell index
type RowIndex = number;
type ColumnIndex = number;

//RowIndex - each vertical cell
//ColumnIndex - each horizontal cell
type ShipCoordinates = [RowIndex, ColumnIndex];

interface Ship {
  type: ShipType;
  orientation: ShipOrientation;
  coordinates: number[][];
  damaged: ShipCoordinates[];
}

//TODO: Handle dublicates in "coordinates", "damaged", "missedShoots" when handlingBoardClick.

// const initialState: Ship[] = [
//   {
//     type: 'Huge ship',
//     orientation: 'horizontal',
//     coordinates: [
//       [0, 1],
//       [0, 2],
//       [0, 3],
//       [0, 4],
//     ],
//     damaged: [],
//   },
// ];

const initialState: Ship[] = battleFieldGenerate();

export const Board = () => {
  const [ships, setShips] = useState<Ship[]>(initialState);
  const [missedShoots, setMissedShoots] = useState<ShipCoordinates[]>([]);
  battleFieldGenerate();
  const boardWrapperStyle =
    'relative w-full h-screen flex items-center justify-center';
  const boardStyle =
    'relative w-full h-full max-w-[600px] max-h-[600px] grid grid-cols-[repeat(10,1fr)] gap-[1px]';

  //Function takes two corteges with coordinates and makes array decomposition
  //then it compares rowIndex & columnIndex from each tuple
  const isEqualCoordinates = (
    coordinates1: ShipCoordinates,
    coordinates2: ShipCoordinates
  ) => {
    const [rowIndex1, columnIndex1] = coordinates1;
    const [rowIndex2, columnIndex2] = coordinates2;
    return rowIndex1 === rowIndex2 && columnIndex1 === columnIndex2;
  };

  //Array.some() - Checks if at least one element of the array satisfies the condition
  const findShipByOccupiedCell = (coordinates: ShipCoordinates) =>
    ships.find(ship =>
      ship.coordinates.some(coord => isEqualCoordinates(coord, coordinates))
    );

  const findShipByHittedCell = (coordinates: ShipCoordinates) =>
    ships.find(ship =>
      ship.damaged.some(coord => isEqualCoordinates(coord, coordinates))
    );

  const isMissedCell = (coordinates: ShipCoordinates) => {
    return missedShoots.some(coord => isEqualCoordinates(coord, coordinates));
  };

  //We using event delegation for click handling
  const handleBoardClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const cell = target.closest(
      `[data-type="${CELL_TYPE_IN_HTML}"]`
    ) as HTMLDivElement; //about closest method https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

    if (!cell) return;

    //getAttribute return string, we need parse it to number
    const rowIndex = parseInt(cell.getAttribute('data-row-index')!);
    const columnIndex = parseInt(cell.getAttribute('data-column-index')!);
    const coordinates: ShipCoordinates = [rowIndex, columnIndex];

    const ship = findShipByOccupiedCell(coordinates);

    if (ship) {
      console.log('A');
      const damaged = [...ship.damaged, coordinates];
      const updatedShip = { ...ship, damaged };
      setShips(currentShips =>
        currentShips.map(currentShip =>
          currentShip === ship ? updatedShip : currentShip
        )
      );
      return;
    }

    setMissedShoots(currentMissedShoots => [
      ...currentMissedShoots,
      coordinates,
    ]);
  };

  return (
    <div className={boardWrapperStyle}>
      <div className={boardStyle} onClick={handleBoardClick}>
        <BorderSide items={NUMERIC_SIDE} position="top" />
        <BorderSide items={ALPHABETIC_SIDE} position="left" />
        {Array.from({ length: BOARD_HEIGHT }, (_, rowIndex) =>
          Array.from({ length: BOARD_WIDTH }, (_, columnIndex) => {
            const coordinates: ShipCoordinates = [rowIndex, columnIndex];

            let type: null | CellType = null;

            if (findShipByOccupiedCell(coordinates)) type = CellType.OCCUPIED;
            if (findShipByHittedCell(coordinates)) type = CellType.HITTED;
            if (isMissedCell(coordinates)) type = CellType.MISS;

            //In another case type = null, that we handling with ?? operator that return right operator if left one is null or undefined

            return (
              <Cell
                key={`${rowIndex}-${columnIndex}`}
                type={type ?? CellType.EMPTY}
                data-type={CELL_TYPE_IN_HTML}
                data-row-index={rowIndex}
                data-column-index={columnIndex}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
