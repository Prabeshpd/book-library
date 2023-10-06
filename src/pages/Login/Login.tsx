import { connect } from 'react-redux';

import { loginUser } from '@/actions/login';
import toast from '@/lib/toast';
import { LoginRequest } from '@/types/login';
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
  const { loginUser } = props;

  const handleFormSubmit = async (payload: LoginRequest) => {
    try {
      await loginUser(payload);

      toast('You have logged in successfully.', 'success');
    } catch (err) {
      toast('The provided credentials are invalid.', 'error');
    }
  };

  return (
    <div className="layout-auth">
      <h2 className="layout-auth__heading">Log In Form</h2>
      <LogInForm handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    isLoggedIn: state.data.user.isLoggedIn,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(Login);
