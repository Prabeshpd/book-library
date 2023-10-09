import { Route, Routes } from 'react-router-dom';
import Profile from './Profile/Profile';
import Books from './Books/Books';
import BookDetail from './BookDetail/BookDetail';

import Header from '@/components/Header/Header';

function AppRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </>
  );
}

export default AppRouter;
