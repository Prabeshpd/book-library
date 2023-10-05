import { createContext } from 'react';

import Firebase, { IFirebaseServices } from '../config/firebase';

const FirebaseContext = createContext<IFirebaseServices | null>(null);

const FirebaseProvider = ({ children }: any) => {
  const firebase = Firebase.getFirebaseServices();

  return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>;
};

export { FirebaseProvider, FirebaseContext };
