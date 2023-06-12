import classNames from 'classnames';

export enum CellType {
  EMPTY = 'Empty',
  MISS = 'Miss',
  HITTED = 'Hitted',
}

export interface CellProps {
  type: CellType;
}

export const Cell = ({ type }: CellProps) => {
  const defaultCellStyle =
    'w-full aspect-square outline outline-[1px] outline-dark';

  const cellDynamicStyle = {
    'flex align-center justify-center': type === CellType.MISS,
  };

  return (
    <div className={classNames(defaultCellStyle, cellDynamicStyle)}>
      {type === CellType.MISS && (
        <div className="w-[10%] h-[10%] rounded-full bg-dark"></div>
      )}
    </div>
  );
};
