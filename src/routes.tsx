import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Registration from './pages/Registration/Registration';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
