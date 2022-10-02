import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './auth.scss';
import { AiOutlineHome } from 'react-icons/ai';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/UI/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logginStart } from '../../store/user/userSlice';
import { isLoggedSelector } from '../../store/user/userSelector';

interface IInputFields {
  email: string;
  password: string;
}

interface LocationState {
  from: {
    pathname: string;
  };
}

const SignInPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [inputFields, setInputFields] = useState<IInputFields>({
    email: 'tonguyentiendat@gmail.com',
    password: '12345678',
  });
  const isLogged = useSelector(isLoggedSelector);

  let fm = '';

  if (location.state) {
    const { from } = location.state as LocationState;

    fm = from.pathname;
  }

  useEffect(() => {
    if (isLogged && fm) navigate(fm, { replace: true });
    // if (isLogged && !fm) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, navigate]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(logginStart(inputFields));
  };

  return (
    <main className="auth-container">
      <div className="auth__title">
        <Link to="/">
          <AiOutlineHome />
        </Link>
        <h1>Sign in with your email and password</h1>
      </div>
      <form className="auth__inputs" onSubmit={formSubmitHandler}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={inputFields.email}
          onChange={inputChangeHandler}
          // required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={inputFields.password}
          onChange={inputChangeHandler}
          // required
        />
        <div className="auth__description">
          <span>If you don't have an account </span>
          <Link to="./sign-up">Register now</Link>
        </div>

        <div className="auth__cta">
          <Button className="auth__btn btn--grey btn--horizontal btn--shadow">
            SIGN IN
          </Button>
          <Button
            as={Link}
            to="/admin"
            className="auth__btn btn--grey btn--horizontal btn--shadow"
          >
            admin
          </Button>
        </div>
      </form>
    </main>
  );
};
export default SignInPage;
