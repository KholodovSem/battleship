import { memo } from 'react';
import classNames from 'classnames';

type BorderSideItem = number | string;

interface BorderSideProps {
  items: BorderSideItem[];
  position: 'top' | 'left';
}

const BorderSide = ({ items, position }: BorderSideProps) => {
  const borderSideDefaultStyle = 'absolute grid select-none';
  const topBorderSideStyle = `left-0 top-[-30px] right-0 grid-cols-[repeat(10,1fr)]`;
  const leftBorderSideStyle = 'left-[-20px] top-0 bottom-0';

  const borderSideDynamicStyle = {
    [leftBorderSideStyle]: position === 'left',
    [topBorderSideStyle]: position === 'top',
  };

  return (
    <div className={classNames(borderSideDefaultStyle, borderSideDynamicStyle)}>
      {items.map(item => (
        <div
          key={item}
          className="flex justify-center items-center font-medium"
        >
          {item.toString().toUpperCase()}
        </div>
      ))}
    </div>
  );
};

const MemoizedBorderSide = memo(BorderSide);
export { MemoizedBorderSide as BorderSide };
