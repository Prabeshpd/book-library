import * as React from 'react';

import RegistrationForm from './Form';
import toast from '../../lib/toast';

const Register = () => {
  const handleFormSubmit = async (payload: any) => {
    try {
      await createUserAction(payload);
      toast('The user account has been successfully created. You can now log in.', 'success');
    } catch (err) {
      toast('An issue occurred when creating the user account', 'error');
    }
  };

  return (
    <div className="layout-auth">
      <h2 className="layout-auth__heading">Sign Up Form</h2>
      <RegistrationForm handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Register;
