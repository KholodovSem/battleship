import { useState } from 'react';
import { Cell, CellType } from '@/components/Cell';
import { BorderSide } from '@/components/BorderSide';

interface Cell {
  id: number;
  type: CellType;
}

const BOARD_HEIGHT = 10;
const BOARD_WIDTH = 10;
const BOARD_SIZE = BOARD_HEIGHT * BOARD_WIDTH;

const NUMERIC_SIDE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ALPHABETIC_SIDE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

export const Board = () => {
  const [cells, setCells] = useState(() =>
    [...Array(BOARD_SIZE).keys()].map((_, index) => ({
      id: index,
      type: CellType.EMPTY,
    }))
  );

  const boardWrapperStyle =
    'relative w-full h-screen flex items-center justify-center';
  const boardStyle =
    'relative w-full h-full max-w-[600px] max-h-[600px] grid grid-cols-[repeat(10,1fr)] gap-[1px]';

  return (
    <div className={boardWrapperStyle}>
      <div className={boardStyle}>
        <BorderSide items={NUMERIC_SIDE} position="top" />
        <BorderSide items={ALPHABETIC_SIDE} position="left" />

        {cells.map(cell => (
          <Cell key={cell.id} type={cell.type} />
        ))}
      </div>
    </div>
  );
};
