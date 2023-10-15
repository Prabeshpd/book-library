import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/store';
import { logout } from '@/reducers/Authentication/authentication';

function Header() {
  const location = useLocation();
  const pathSegment = location.pathname;

  const dispatch = useAppDispatch();

  const dispatchLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="app-header">
      <nav className="app-header__navigation">
        <div className="app-header__menu">
          <a
            href="/profile"
            data-test-id="app-header-profile-nav"
            className={classNames('app-header__link', {
              'app-header__link--active': pathSegment === '/profile',
            })}
          >
            Profile
          </a>
          <a
            href="/books"
            data-test-id="app-header-books-nav"
            className={classNames('app-header__link', {
              'app-header__link--active': pathSegment === '/books',
            })}
          >
            Books
          </a>
        </div>
        <div className="app-header__dropdown">
          <button type="button" onClick={dispatchLogout}>
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
