import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="loading-container">
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
