import { useState } from 'react';

import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/UI/Button/Button';
import './auth.scss';

interface IInputFields {
  displayName: '';
  email: '';
  password: '';
  confirmPassword: '';
}

const initInputFields: IInputFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpPage = () => {
  const [inputFields, setInputFields] = useState(initInputFields);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputFields({ ...inputFields, [name]: value });
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(inputFields);
  };

  const inputs = [
    {
      id: 1,
      name: 'displayName',
      type: 'text',
      errorMessage: 'Display Name should be 3-16 characters and it not empty',
      label: 'Display Name',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      errorMessage: 'It should be a valid email address!!',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      errorMessage:
        'Password must least 8 characters! (include single character and digit)',
      label: 'Password',
      pattern: `^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d][A-Za-z\\d!@#$%^&*()_+]{8,19}$`,
      required: true,
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      errorMessage: 'Password does not match',
      label: 'Confirm Password',
      pattern: inputFields.password,
      required: true,
    },
  ];

  return (
    <main className="auth-container" onSubmit={formSubmitHandler}>
      <div className="auth__title">
        <AiOutlineHome />
        <h1>Sign up</h1>
      </div>
      <form className="auth__inputs">
        {inputs.map(input => {
          const { id, ...inputProps } = input;
          return (
            <FormInput
              key={id}
              {...inputProps}
              value={inputFields[input.name as keyof IInputFields]}
              onChange={inputChangeHandler}
            />
          );
        })}

        <div className="auth__description">
          <span>If you have an account </span>
          <Link to="/auth">SignIn now</Link>
        </div>

        <div className="auth__cta">
          <Button className="auth__btn btn--grey btn--horizontal btn--shadow">
            SIGN UP
          </Button>
        </div>
      </form>
    </main>
  );
};
export default SignUpPage;
