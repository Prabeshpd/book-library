import { useContext } from 'react';
import { ref, set } from 'firebase/database';

import { FirebaseContext } from '@/context/firebase';
import { IFirebaseServices } from '@/types/firebase';

export const useUserFirebaseDatabase = () => {
  const firebase = useContext<IFirebaseServices | null>(FirebaseContext);
  const database = firebase?.database;

  const saveUser = async (details: any) => {
    const { userId, email, password, name, imageUrl } = details;

    if (!database) return;

    set(ref(database, '/users' + userId), { email, password, name, imageUrl }).catch((err) => {
      throw err;
    });
  };

  return { saveUser };
};
