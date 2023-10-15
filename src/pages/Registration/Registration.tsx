import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

import RegistrationForm from './Form';

import toast from '@/lib/toast';
import { createUser } from '@/adapters/user';
import { RegisterPayload } from '@/types/auth';
import { useUserFirebaseDatabase } from '@/hooks/useFirebaseDatabase';

const Register = () => {
  const { saveUser } = useUserFirebaseDatabase();
  const navigate = useNavigate();

  const handleFormSubmit = async (registerPayload: RegisterPayload) => {
    try {
      const payload = { ...registerPayload, id: uuidv4() };
      await createUser(payload);
      // It can be done from the backend itself. As, we are mimicing the json server as backend.
      await saveUser(payload);
      navigate('/login');
      toast('The user account has been successfully created. You can now log in.', 'success');
    } catch (err) {
      toast('An issue occurred when creating the user account', 'error');
    }
  };

  return (
    <div className="layout-auth">
      <div className="layout-auth__card">
        <header className="layout-auth__heading">Registration Form</header>

        <RegistrationForm handleFormSubmit={handleFormSubmit} />
        <div className="layout-auth__footer">
          Already have an account.
          <Link className="layout-auth__link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
