import { Navigate, Link } from 'react-router-dom';

import { login } from '@/reducers/Authentication/actions';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import toast from '@/lib/toast';
import { LoginRequest } from '@/types/auth';

import LogInForm from './Form';

const Login = () => {
  const { isLoggedIn } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (payload: LoginRequest) => {
    try {
      await dispatch(login(payload));

      toast('You have logged in successfully.', 'success');
    } catch (err) {
      toast('The provided credentials are invalid.', 'error');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" replace={true} />;
  }

  return (
    <div className="layout-auth">
      <div className="layout-auth__card">
        <header className="layout-auth__heading">Log In Form</header>
        <LogInForm handleFormSubmit={handleFormSubmit} />
        <div className="layout-auth__footer">
          Not Created an account
          <Link className="layout-auth__link" to="/register">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
