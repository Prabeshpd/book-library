import http from '@/lib/requestManager/requestManager';
import fs from 'fs';

const resetServer = async () => {
  const database = await JSON.parse(fs.readFileSync('./mockServer/db.json', 'utf8'));

  if (!database.users.length) return null;

  const { data } = await http.post('/reloadDb');

  return data;
};

export default resetServer;
