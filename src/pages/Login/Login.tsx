import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { loginUser } from '@/actions/login';
import toast from '@/lib/toast';
import { LoginRequest } from '@/types/auth';
import AppState from '@/types/states/app';

import LogInForm from './Form';

interface StatePropsInterface {
  isLoggedIn: boolean;
}

interface DispatchPropsInterface {
  loginUser: (payload: LoginRequest) => void;
}

type loginProps = StatePropsInterface & DispatchPropsInterface;

const Login = (props: loginProps) => {
  const { isLoggedIn, loginUser } = props;

  const handleFormSubmit = async (payload: LoginRequest) => {
    try {
      await loginUser(payload);

      toast('You have logged in successfully.', 'success');
    } catch (err) {
      toast('The provided credentials are invalid.', 'error');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/app/profile" replace={true} />;
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

const mapStateToProps = (state: AppState) => {
  return {
    isLoggedIn: state.data.users.isLoggedIn,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(Login);
