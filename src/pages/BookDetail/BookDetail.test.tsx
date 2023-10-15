import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { render, waitFor, screen } from '@testing-library/react';

import BookDetail from './BookDetail';

jest.mock('../../actions/books', () => ({
  fetchBookDetail: jest.fn(),
}));

describe('book detail', () => {
  const mockStore = configureStore([]);
  describe('given valid props', () => {
    it('renders the component', async () => {
      const store = mockStore({
        fetchBookDetail: jest.fn(),
        data: { books: { bookDetail: { userBooks: [] } }, users: { user: { id: '' } } },
        ui: { books: { isLoadingFetchBookDetail: false } },
      });

      render(
        <Provider store={store}>
          <BookDetail />
        </Provider>,
      );

      await waitFor(() => {
        expect(screen.getByText('Title:')).toBeInTheDocument();
      });

      expect(screen.getByText('Borrow Book')).toBeInTheDocument();
    });
  });

  describe('given user has borrowed the book', () => {
    it('does NOT render Borrow Book button', async () => {
      const store = mockStore({
        fetchBookDetail: jest.fn(),
        data: { books: { bookDetail: { userBooks: [{ userId: '1' }] } }, users: { user: { id: '1' } } },
        ui: { books: { isLoadingFetchBookDetail: false } },
      });

      render(
        <Provider store={store}>
          <BookDetail />
        </Provider>,
      );

      await waitFor(async () => {
        expect(screen.queryByText('Borrow Book')).not.toBeInTheDocument();
      });

      expect(screen.getByText('Already Borrowed')).toBeInTheDocument();
    });
  });
});
