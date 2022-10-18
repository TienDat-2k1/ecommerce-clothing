import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import ModalOverlay from './ModalOverlay';

type ModalOwnProps = {
  children: React.ReactNode;
  className: string;
  onClose: () => void;
};

type ModalProps<E extends React.ElementType> = ModalOwnProps &
  Omit<React.ComponentProps<E>, keyof ModalOwnProps>;

const portalElement = document.getElementById('overlays') as HTMLElement;

const Modal = <E extends React.ElementType>({
  children,
  className,
  onClose,
}: ModalProps<E>) => {
  useEffect(() => {
    const keyupHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keyup', keyupHandler);

    return () => window.removeEventListener('keyup', keyupHandler);
  }, [onClose]);

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};
export default Modal;
