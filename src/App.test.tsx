import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders the component', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Welcome to Application')).toBeInTheDocument();
    });
  });
});
