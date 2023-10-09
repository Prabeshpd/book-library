import '@testing-library/jest-dom';

import selectEvent from 'react-select-event';

import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FilterForm from './FilterForm';

describe('Filter form', () => {
  describe('given valid props', () => {
    it('renders the component', async () => {
      const onApplyFilter = jest.fn();
      const onResetFilter = jest.fn();

      render(<FilterForm onApplyFilter={onApplyFilter} onResetFilter={onResetFilter} />);

      await waitFor(() => {
        const inputQueryElement = screen.getByPlaceholderText('Search for title');

        expect(inputQueryElement).toBeInTheDocument();
      });
      const submitButtonElement = screen.getByRole('button', { name: 'Filter' });

      expect(submitButtonElement).toBeInTheDocument();
    });
  });

  describe('given form is submitted', () => {
    it('submits the form"s input values on submit', async () => {
      const onApplyFilter = jest.fn();
      const onResetFilter = jest.fn();

      render(<FilterForm onApplyFilter={onApplyFilter} onResetFilter={onResetFilter} />);

      const user = userEvent.setup();
      await selectEvent.select(screen.getByLabelText('Category'), ['Biography']);
      const inputQueryElement = screen.getByPlaceholderText('Search for title');
      const submitButtonElement = screen.getByRole('button', { name: 'Filter' });
      await user.type(inputQueryElement, 'War And Peace');
      await user.click(submitButtonElement);

      await waitFor(() => {
        expect(onApplyFilter).toHaveBeenCalledWith({
          title: 'War And Peace',
          category: 'biography',
        });
      });
    });
  });
});
