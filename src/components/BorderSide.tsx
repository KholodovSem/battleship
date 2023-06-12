import { memo, type ReactNode } from 'react';

//TODO: Transfer these variables to Board component
const NUMERIC_SIDE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ALPHABETIC_SIDE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

interface BorderSideProps<T> {
  items: T[];
}

const BorderSide = <T,>({ items }: BorderSideProps<T>) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex gap-[5px]">
      {items.map(item => (
        <div>{item as ReactNode}</div>
      ))}
    </div>
  );
};

const MemoizedBorderSide = memo(BorderSide);

export { MemoizedBorderSide as BorderSide };
