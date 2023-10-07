import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders the component', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('root')).toBeInTheDocument();
    });
  });
});
