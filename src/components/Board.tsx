import { useState, type MouseEvent } from 'react';
import { Cell, CellType } from '@/components/Cell';
import { BorderSide } from '@/components/BorderSide';

const BOARD_HEIGHT = 10;
const BOARD_WIDTH = 10;
const BOARD_SIZE = BOARD_HEIGHT * BOARD_WIDTH;
const CELL_FOR_BOARD = [...Array(BOARD_SIZE).keys()].map(item => item);
const CELL_TYPE_IN_HTML = 'board-cell';

const NUMERIC_SIDE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ALPHABETIC_SIDE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

/* 
Number of ships

Huge ship - 1;
Big ship - 2;
Medium ship - 3;
Small ship - 4;

*/

type ShipType = 'Huge ship' | 'Big ship' | 'Medium ship' | 'Small ship';

type ShipOrientation = 'horizontal' | 'vertical';

interface Ship {
  type: ShipType;
  orientation: ShipOrientation; //possible orientation is "Horizontal" or "Vertical"
  coordinates: number[]; //indexes of the cells
  damaged: number[]; //similarly to the coordinates
}

//TODO: Handle dublicates in "coordinates", "damaged", "missedShoots" when handlingBoardClick.

const initialState: Ship[] = [
  {
    type: 'Huge ship',
    orientation: 'horizontal',
    coordinates: [1, 2, 3, 4],
    damaged: [],
  },
];

export const Board = () => {
  const [ships, setShips] = useState<Ship[]>(initialState);
  const [missedShoots, setMissedShoots] = useState<number[]>([]); //stores indexes of missed cells

  const boardWrapperStyle =
    'relative w-full h-screen flex items-center justify-center';
  const boardStyle =
    'relative w-full h-full max-w-[600px] max-h-[600px] grid grid-cols-[repeat(10,1fr)] gap-[1px]';

  const findShipByOccupiedCell = (cellIndex: number) =>
    ships.find(ship => ship.coordinates.includes(cellIndex));

  const findShipByHittedCell = (cellIndex: number) =>
    ships.find(ship => ship.damaged.includes(cellIndex));

  const isMissedCell = (cellIndex: number) => {
    return missedShoots.includes(cellIndex);
  };

  //We using event delegation for click handling
  const handleBoardClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const cell = target.closest(
      `[data-type="${CELL_TYPE_IN_HTML}"]`
    ) as HTMLDivElement; //about closest method https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

    if (!cell) return;

    const cellIndex = parseInt(cell.getAttribute('data-index')!); //getAttribute return string, we need parse it to number
    const ship = findShipByOccupiedCell(cellIndex);

    if (ship) {
      const damaged = [...ship.damaged, cellIndex];
      const updatedShip = { ...ship, damaged };
      setShips(currentShips =>
        currentShips.map(currentShip =>
          currentShip === ship ? updatedShip : currentShip
        )
      );
      return;
    }

    setMissedShoots(currentMissedShoots => [...currentMissedShoots, cellIndex]);
  };

  return (
    <div className={boardWrapperStyle}>
      <div className={boardStyle} onClick={handleBoardClick}>
        <BorderSide items={NUMERIC_SIDE} position="top" />
        <BorderSide items={ALPHABETIC_SIDE} position="left" />
        {CELL_FOR_BOARD.map(cellIndex => {
          let type: null | CellType = null;

          if (findShipByOccupiedCell(cellIndex)) type = CellType.OCCUPIED;
          if (findShipByHittedCell(cellIndex)) type = CellType.HITTED;
          if (isMissedCell(cellIndex)) type = CellType.MISS;

          //In another case type = null, that we handling with ?? operator that return right operator if left one is null or undefined

          return (
            <Cell
              key={cellIndex}
              type={type ?? CellType.EMPTY}
              data-type={CELL_TYPE_IN_HTML}
              data-index={cellIndex}
            />
          );
        })}
      </div>
    </div>
  );
};
