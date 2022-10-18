import './Modal.scss';

const Backdrop = ({ onClose }: { onClose: () => void }) => {
  return <div className="backdrop" onClick={onClose} />;
};
export default Backdrop;
