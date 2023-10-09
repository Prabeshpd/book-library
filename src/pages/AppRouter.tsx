import { Route, Routes } from 'react-router-dom';
import Profile from './Profile/Profile';
import Books from './Books/Books';
import BookDetail from './BookDetail/BookDetail';

function AppRouter() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/books" element={<Books />} />
      <Route path="/book/:id" element={<BookDetail />} />
    </Routes>
  );
}

export default AppRouter;
