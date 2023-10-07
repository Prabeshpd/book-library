import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import HeaderComponent from './Header';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(() => {
    return { pathName: '' };
  }),
}));

describe('Header', () => {
  const mockStore = configureStore([]);

  describe('renders the component', () => {
    it('renders the header component', async () => {
      const store = mockStore({
        logout: jest.fn(),
      });

      render(
        <Provider store={store}>
          <HeaderComponent />
        </Provider>,
      );

      expect(useLocation as jest.Mock).toHaveBeenCalled();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Log out')).toBeInTheDocument();
    });
  });

  describe('given the page is in navbar', () => {
    it('adds active property to class name', async () => {
      (useLocation as jest.Mock).mockReturnValue({ pathname: '/app/books' });
      const store = mockStore({
        logout: jest.fn(),
      });

      render(
        <Provider store={store}>
          <HeaderComponent />
        </Provider>,
      );

      const element = screen.getByText('Books');

      expect(element.classList.contains('app-header__link--active')).toBe(true);
    });
  });
});
