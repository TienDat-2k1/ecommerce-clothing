import { useState, useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/UI/Button/Button';
import { useSignupMutation } from '../../features/Auth/authApiSlice';
import { isLoggedSelector } from '../../store/user/userSelector';
import './auth.scss';

interface IInputFields {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initInputFields: IInputFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState(initInputFields);
  const isLogged = useSelector(isLoggedSelector);
  const [signup, result] = useSignupMutation();

  useEffect(() => {
    if (result.error) {
      toast.warning((result.error as any).data?.message);
    }
    if (result.isSuccess) {
      toast.success('register successful!');
    }
  }, [result]);

  useEffect(() => {
    if (!isLogged) return;
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputFields({ ...inputFields, [name]: value });
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const { displayName, confirmPassword, ...otherInputs } = inputFields;

    signup({
      name: displayName,
      passwordConfirm: confirmPassword,
      ...otherInputs,
    });

    // dispatch(
    //   signupStart({
    //     name: displayName,
    //     passwordConfirm: confirmPassword,
    //     ...otherInputs,
    //   })
    // );
  };

  const inputs = [
    {
      id: 1,
      name: 'displayName',
      type: 'text',
      errorMessage: 'Tên hiển thị nên có từ 3-20 kí tự!!',
      label: 'Tên hiển thị',
      pattern: '.{3,20}',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      errorMessage: 'Địa chỉ email không hợp lệ!',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      errorMessage: 'Mật khẩu ít nhất phải 8 kí tự (bao gồm chữ và số)',
      label: 'Mật khẩu',
      pattern: `^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d][A-Za-z\\d!@#$%^&*()_+]{7,19}$`,
      required: true,
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      errorMessage: 'Không hợp lệ',
      label: 'Nhập lại mật khẩu',
      pattern: inputFields.password,
      required: true,
    },
  ];

  return (
    <main className="auth-container" onSubmit={formSubmitHandler}>
      <div className="auth__title">
        <Link to="/">
          <AiOutlineHome />
        </Link>
        <h1>Đăng ký</h1>
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
          <span>Nếu bạn đã có tài khoản</span>
          <Link to="/auth">Đăng nhập ngay</Link>
        </div>

        <div className="auth__cta">
          <Button className="auth__btn btn--grey btn--horizontal btn--shadow">
            {result.isLoading ? 'Đang xử lý...' : 'REGISTER'}
          </Button>
        </div>
      </form>
    </main>
  );
};
export default SignUpPage;
