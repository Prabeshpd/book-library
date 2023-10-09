import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

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
  let navigate = useNavigate();

  const navigateToRegister = () => {
    let path = `/register`;
    navigate(path);
  };

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
      <div className="align-centre">
        <p className="text-center">
          Not Created an account
          <a className="primary hollow medium" onClick={navigateToRegister}>
            Click here for signup
          </a>
        </p>
      </div>
      <h2 className="layout-auth__heading">Log In Form</h2>
      <LogInForm handleFormSubmit={handleFormSubmit} />
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
