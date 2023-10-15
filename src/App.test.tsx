import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import App from './App';
import TestWrapper from '../test/testWrapper/TestWrapper';

describe('App', () => {
  it('renders the component', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('root')).toBeInTheDocument();
    });
  });
});
