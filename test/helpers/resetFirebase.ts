import fs from 'fs';

import { ref as databaseRef, remove } from 'firebase/database';
import { ref as storageRef, deleteObject } from 'firebase/storage';

import Firebase from '@/config/firebase';

const resetFirebaseServices = async () => {
  const database = await JSON.parse(fs.readFileSync('./mockServer/db.json', 'utf8'));
  if (!database.users.length) return null;

  const firebaseApp = Firebase.getFirebaseServices();

  for (let user of database.users as unknown as any[]) {
    if (user.imageUrl) {
      await deleteObject(storageRef(firebaseApp.storage, user.imageUrl));
    }

    remove(databaseRef(firebaseApp.database, '/users' + user.id));
  }

  return null;
};

export default resetFirebaseServices;
