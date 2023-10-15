import '@testing-library/jest-dom';

import { render, waitFor, screen } from '@testing-library/react';

import { useAppDispatch, useAppSelector } from '@/hooks/store';

import BookDetail from './BookDetail';
import TestWrapper from '../../../test/testWrapper/TestWrapper';

jest.mock('../../hooks/store');

const mockDispatch = jest.fn();

describe('book detail', () => {
  describe('given valid props', () => {
    it('renders the component', async () => {
      const store = {
        books: { book: { userBooks: [] }, isLoadingFetchBookDetail: false },
        users: { user: { id: '' } },
      };
      (useAppSelector as jest.Mock).mockImplementation((callback) => callback(store));
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <BookDetail />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText('Title:')).toBeInTheDocument();
      });

      expect(screen.getByText('Borrow Book')).toBeInTheDocument();
    });
  });

  describe('given user has borrowed the book', () => {
    it('does NOT render Borrow Book button', async () => {
      const store = {
        books: { book: { userBooks: [{ userId: '1' }] }, isLoadingFetchBookDetail: false },
        users: { user: { id: '1' } },
      };
      (useAppSelector as jest.Mock).mockImplementation((callback) => callback(store));
      (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);

      render(
        <TestWrapper>
          <BookDetail />
        </TestWrapper>,
      );

      await waitFor(async () => {
        expect(screen.queryByText('Borrow Book')).not.toBeInTheDocument();
      });

      expect(screen.getByText('Already Borrowed')).toBeInTheDocument();
    });
  });
});
