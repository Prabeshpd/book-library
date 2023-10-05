import RegistrationForm from './Form';

import toast from '../../lib/toast';
import { RegisterPayload } from '../../types/users';
import { createUser } from '../../services/users';

const Register = () => {
  const handleFormSubmit = async (payload: RegisterPayload) => {
    try {
      await createUser(payload);
      toast('The user account has been successfully created. You can now log in.', 'success');
    } catch (err) {
      toast('An issue occurred when creating the user account', 'error');
    }
  };

  return (
    <div className="layout-auth">
      <h2 className="layout-auth__heading">Registration Form</h2>
      <RegistrationForm handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Register;
