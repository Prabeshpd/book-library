import classNames from 'classnames';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { logout } from '@/actions/logout';

interface DispatchPropsInterface {
  logout: () => {};
}

type HeaderProps = DispatchPropsInterface;

function Header(props: HeaderProps) {
  const location = useLocation();
  const pathSegment = location.pathname;

  const { logout } = props;

  return (
    <header className="app-header">
      <nav className="app-header__navigation">
        <div className="app-header__menu">
          <a
            href="/app/profile"
            data-test-id="app-header-profile-nav"
            className={classNames('app-header__link', {
              'app-header__link--active': pathSegment === '/app/profile',
            })}
          >
            Profile
          </a>
          <a
            href="/app/books"
            data-test-id="app-header-books-nav"
            className={classNames('app-header__link', {
              'app-header__link--active': pathSegment === '/app/books',
            })}
          >
            Books
          </a>
        </div>
        <div className="app-header__dropdown">
          <button
            type="button"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
}

const mapDispatchToProps = {
  logout,
};

export default connect<null, DispatchPropsInterface>(null, mapDispatchToProps)(Header);
