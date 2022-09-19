import React from 'react';

import './Modal.scss';

type ModalOverlayOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  className?: string;
};

type ModalOverlayProps<E extends React.ElementType> = ModalOverlayOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ModalOverlayOwnProps<E>>;

const ModalOverlay = <E extends React.ElementType = 'div'>({
  children,
  className,
  ...otherProps
}: ModalOverlayProps<E>) => {
  return (
    <div className="modal" {...otherProps}>
      <div className={`content ${className && className}`}>{children}</div>
    </div>
  );
};
export default ModalOverlay;
