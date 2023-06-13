import { type PropsWithChildren, type HTMLAttributes } from 'react';
import classNames from 'classnames';

type ButtonType = '3D' | 'solid' | 'outline' | 'transparent';
type ButtonColor = 'yellow';

interface ButtonProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLButtonElement> {
  variant: ButtonType;
  color: ButtonColor;
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  const defaultButtonStyle = 'flex align-center items-center font-semibold';

  return (
    <button {...rest} className={classNames(defaultButtonStyle)}>
      {children}
    </button>
  );
};
