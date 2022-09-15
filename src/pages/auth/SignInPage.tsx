import './auth.scss';
import { AiOutlineHome } from 'react-icons/ai';
const SignInPage = () => {
  return (
    <main className="auth-container">
      <div className="auth__title">
        <AiOutlineHome />
        <h1>Sign in with email and password</h1>
      </div>
    </main>
  );
};
export default SignInPage;
