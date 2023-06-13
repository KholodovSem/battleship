import { memo, type HTMLAttributes } from 'react';
import classNames from 'classnames';

export enum CellType {
  EMPTY = 'Empty',
  MISS = 'Miss',
  HITTED = 'Hitted',
  OCCUPIED = 'Occupied',
}

export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  type: CellType;
}

const Cell = ({ type, ...rest }: CellProps) => {
  const defaultCellStyle =
    'w-full aspect-square outline outline-[1px] outline-dark';

  const lineStyle = 'absolute block bg-red w-full h-[10%] top-[50%] left-[50%]';

  const cellDynamicStyle = {
    'flex items-center justify-center': type === CellType.MISS,
    'bg-grey': type === CellType.OCCUPIED,
    'relative overflow-hidden bg-grey': type === CellType.HITTED,
  };

  return (
    <div {...rest} className={classNames(defaultCellStyle, cellDynamicStyle)}>
      {type === CellType.MISS && (
        <div className="w-[25%] h-[25%] rounded-full bg-dark"></div>
      )}
      {type === CellType.HITTED && (
        <>
          <span
            style={{
              transform: 'translate(-50%, -50%) rotate(-45deg)',
            }}
            className={lineStyle}
          ></span>
          <span
            style={{
              transform: 'translate(-50%, -50%) rotate(45deg)',
            }}
            className={lineStyle}
          ></span>
        </>
      )}
    </div>
  );
};

const MemoizedCell = memo(Cell);

export { MemoizedCell as Cell };
