import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FileUploader from './FileUploader';

describe('Upload', () => {
  const setFileUrl = jest.fn();

  it('renders the component', async () => {
    render(<FileUploader isLoading={false} handleChange={setFileUrl} />);

    await waitFor(() => {
      expect(screen.getByText('Upload file')).toBeInTheDocument();
    });
  });

  it('submits the values on submitting the form', async () => {
    render(<FileUploader isLoading={false} handleChange={setFileUrl} />);

    const file = new File(['node', 'react'], 'hello.csv', { type: 'text/csv' });
    const fileInput = screen.getByTestId('file-upload-input');
    userEvent.upload(fileInput, file);
    userEvent.click(screen.getByRole('button', { name: /Upload/i }));

    await waitFor(() => {
      expect(setFileUrl).toHaveBeenCalled();
    });
  });
});
