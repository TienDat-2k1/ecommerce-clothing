import { Link } from 'react-router-dom';

import './auth.scss';
import { AiOutlineHome } from 'react-icons/ai';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/UI/Button/Button';

const SignInPage = () => {
  return (
    <main className="auth-container">
      <div className="auth__title">
        <AiOutlineHome />
        <h1>Sign in with your email and password</h1>
      </div>
      <form className="auth__inputs">
        <FormInput value="" label="Email" required type="email" />
        <FormInput value="" label="Password" required type="password" />
        <div className="auth__description">
          <span>If you don't have an account </span>
          <Link to="./sign-up">Register now</Link>
        </div>

        <div className="auth__cta">
          <Button className="auth__btn btn--grey btn--horizontal btn--shadow">
            SIGN IN
          </Button>
        </div>
      </form>
    </main>
  );
};
export default SignInPage;
