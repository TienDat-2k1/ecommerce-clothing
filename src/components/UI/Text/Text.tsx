import React from 'react';

type TextOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  as?: E;
  className?: string;
};

type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>;

const Text = <E extends React.ElementType>(
  { children, as, className, ...otherProps }: TextProps<E>,
  ref: any
) => {
  const TextComponent = as || 'div';

  return (
    <TextComponent className={`text ${className}`} ref={ref} {...otherProps}>
      {children}
    </TextComponent>
  );
};
export default React.forwardRef(Text);
