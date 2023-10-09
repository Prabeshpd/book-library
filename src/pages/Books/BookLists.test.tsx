import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BookList from './BookLists';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../actions/books', () => ({
  fetchBooks: jest.fn(),
}));

describe('Lists books', () => {
  const mockStore = configureStore([]);
  describe('given there are no books', () => {
    it('renders the component with empty rows', async () => {
      const store = mockStore({
        fetchBooks: jest.fn(),
        data: { books: { books: [], meta: {} } },
        ui: { books: { isLoadingFetchBooks: false } },
      });

      render(
        <Provider store={store}>
          <BookList />
        </Provider>,
      );

      await waitFor(() => {
        const table = screen.queryByTestId('book-table-body');

        expect(table?.children.length).toEqual(0);
      });
      const tableHeaderColumns = screen.getByTestId('table-header-columns');

      expect(screen.queryByText('Title')).toBeInTheDocument();
      expect(screen.queryByTestId('pagination')).toBeNull();
      expect(tableHeaderColumns.children.item(0)?.textContent).toEqual('Title');
    });
  });

  describe('given there are books', () => {
    it('renders the table with valid rows', async () => {
      const store = mockStore({
        fetchBooks: jest.fn(),
        data: {
          books: {
            books: [
              { id: 1, title: '' },
              { id: 2, title: '' },
            ],
            meta: { totalCounts: 2, limit: 10, currentPage: 1 },
          },
        },
        ui: { books: { isLoadingFetchBooks: false } },
      });

      render(
        <Provider store={store}>
          <BookList />
        </Provider>,
      );

      await waitFor(() => {
        const table = screen.queryByTestId('book-table-body');

        expect(table?.children.length).toEqual(2);
      });
      expect(screen.queryByTestId('pagination')).not.toBeNull();
    });
  });

  describe('given next button is clicked', () => {
    it('adds class name active to the page number button', async () => {
      const store = mockStore({
        fetchBooks: jest.fn(),
        data: {
          books: {
            books: [
              { id: 1, title: '' },
              { id: 2, title: '' },
            ],
            meta: { totalCounts: 12, limit: 10, currentPage: 1 },
          },
        },
        ui: { books: { isLoadingFetchBooks: false } },
      });

      render(
        <Provider store={store}>
          <BookList />
        </Provider>,
      );

      const user = userEvent.setup();

      await waitFor(async () => {
        await user.click(screen.getByText('Next'));
        const button = screen.queryByTestId('pagination-button-page-2');
        expect(button?.classList.contains('pagination-navigation__button--active')).toBe(true);
      });
    });
  });
});
