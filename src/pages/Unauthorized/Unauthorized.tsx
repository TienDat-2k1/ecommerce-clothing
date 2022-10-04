import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import './Unauthorized.scss';

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <section className="unauthorized">
      <div>
        <h1>Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <br />
        <Button
          className="btn--outline btn--primary-light btn--shadow"
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </div>
    </section>
  );
};
export default Unauthorized;
