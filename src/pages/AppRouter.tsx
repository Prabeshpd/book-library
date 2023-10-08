import { Route, Routes } from 'react-router-dom';
import Profile from './Profile/Profile';
import Books from './Books/BookLists';

function AppRouter() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/books" element={<Books />} />
    </Routes>
  );
}

export default AppRouter;
