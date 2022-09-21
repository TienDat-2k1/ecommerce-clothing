import React from 'react';

import './Button.scss';

type ButtonOwnProps<E extends React.ElementType> = {
  children?: React.ReactNode;
  as?: E;
  className?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  disabled?: boolean;
};

type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>>;

const Button = <E extends React.ElementType = 'button'>(
  {
    children,
    as,
    className,
    disabled,
    leftIcon,
    rightIcon,
    ...otherProps
  }: ButtonProps<E>,
  ref: any
) => {
  if (disabled) {
    Object.keys(otherProps).forEach(key => {
      if (
        key.startsWith('on') &&
        typeof otherProps[key as keyof typeof otherProps] === 'function'
      ) {
        delete otherProps[key as keyof typeof otherProps];
      }
    });
  }

  const ButtonComponent = as || 'button';
  return (
    <ButtonComponent
      className={`btn ${className ? className : ''} ${
        disabled ? 'disabled' : ''
      }`}
      {...otherProps}
      ref={ref}
    >
      {leftIcon && <span className="btn-icon">{leftIcon}</span>}
      <span className="btn-title">{children}</span>
      {rightIcon && <span className="btn-icon">{rightIcon}</span>}
    </ButtonComponent>
  );
};
export default React.forwardRef(Button);
