import { v4 as uuidv4 } from 'uuid';

import RegistrationForm from './Form';

import toast from '@/lib/toast';
import { createUser } from '@/services/users';
import { RegisterPayload } from '@/types/users';
import { useUserFirebaseDatabase } from '@/hooks/useFirebaseDatabase';

const Register = () => {
  const { saveUser } = useUserFirebaseDatabase();
  const handleFormSubmit = async (registerPayload: RegisterPayload) => {
    try {
      const payload = { ...registerPayload, id: uuidv4() };
      await createUser(payload);
      await saveUser(payload);

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
