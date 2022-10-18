import './Popper.scss';

type PopperProps = {
  children: React.ReactNode;
  className?: string;
};

const Popper = ({ children, className }: PopperProps) => {
  return (
    <div className={`popper ${className ? className : ''}`}>{children}</div>
  );
};
export default Popper;
