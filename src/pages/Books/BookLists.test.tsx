import '@testing-library/jest-dom';

import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useAppDispatch, useAppSelector } from '@/hooks/store';

import BookList from './BookLists';
import TestWrapper from '../../../test/testWrapper/TestWrapper';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../../hooks/store');

const mockDispatch = jest.fn();

describe('Lists books', () => {
  describe('given there are no books', () => {
    it('renders the component with empty rows', async () => {
      const store = {
        books: { books: [], meta: {}, isLoadingFetchBooks: false },
      };
      (useAppSelector as jest.Mock).mockImplementation((callback) => callback(store));
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <BookList />
        </TestWrapper>,
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
      const store = {
        books: {
          books: [
            { id: 1, title: '' },
            { id: 2, title: '' },
          ],
          meta: { totalCounts: 2, limit: 10, currentPage: 1 },
          isLoadingFetchBooks: false,
        },
      };
      (useAppSelector as jest.Mock).mockImplementation((callback) => callback(store));
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <BookList />
        </TestWrapper>,
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
      const store = {
        books: {
          books: [
            { id: 1, title: '' },
            { id: 2, title: '' },
          ],
          meta: { totalCounts: 12, limit: 10, currentPage: 1 },
          isLoadingFetchBooks: false,
        },
      };
      (useAppSelector as jest.Mock).mockImplementation((callback) => callback(store));
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <BookList />
        </TestWrapper>,
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
