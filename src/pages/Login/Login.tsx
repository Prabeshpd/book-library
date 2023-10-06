import toast from '@/lib/toast';
import { LoginPayload } from '@/types/users';

import LogInForm from './Form';

const Login = () => {
  const handleFormSubmit = async (payload: LoginPayload) => {
    toast('The provided credentials are invalid.', 'error');
  };

  return (
    <div className="layout-auth">
      <h2 className="layout-auth__heading">Log In Form</h2>
      <LogInForm handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Login;
