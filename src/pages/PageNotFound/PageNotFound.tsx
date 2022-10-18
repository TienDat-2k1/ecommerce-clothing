import { AiFillBug } from 'react-icons/ai';
import './PageNotFound.scss';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <h2>Not found</h2>

      <div className="bug-icon">
        <AiFillBug />
      </div>
    </div>
  );
};

export default PageNotFound;
