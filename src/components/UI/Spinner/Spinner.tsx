import './Spinner.scss';

type SpinnerProps = {
  style?: {};
};

const Spinner = ({ style }: SpinnerProps) => {
  return (
    <div className="loading-container" style={{ ...style }}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Spinner;
