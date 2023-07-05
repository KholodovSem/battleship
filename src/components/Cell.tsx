import { memo, type HTMLAttributes } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import { DropZones } from '@/utils';
import { onShipDrop } from '@/helpers';
import type { DropZone } from '@/helpers/on-ship-drop';
import type { RowIndex, ColumnIndex } from '@/models/ShipCoordinates';
import type { DraggableShip } from '@/models';

export enum CellType {
  EMPTY = 'Empty',
  MISS = 'Miss',
}

export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  type: CellType;
  row: RowIndex;
  column: ColumnIndex;
}

const Cell = ({ type, row, column, ...rest }: CellProps) => {
  const [collectedProps, dropRef] = useDrop<DraggableShip>({
    accept: 'ship',
    drop: ship => {
      const dropZone: DropZone = {
        name: DropZones.BOARD_CELL,
        zoneInfo: {
          row,
          column,
        },
      };
      onShipDrop(ship, dropZone);
    },
  });

  const defaultCellStyle = 'w-full outline outline-[1px] outline-dark';

  const cellDynamicStyle = {
    'flex items-center justify-center cursor-not-allowed':
      type === CellType.MISS,
  };

  return (
    <div
      {...rest}
      ref={dropRef}
      className={classNames(defaultCellStyle, cellDynamicStyle)}
    >
      {type === CellType.MISS && (
        <div className="w-[25%] h-[25%] rounded-full bg-dark"></div>
      )}
    </div>
  );
};

const MemoizedCell = memo(Cell);

export { MemoizedCell as Cell };
