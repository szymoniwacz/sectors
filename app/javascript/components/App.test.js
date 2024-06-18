import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';

jest.mock('axios');

const sectorsData = [
  { id: 1, parent_id: null, name: 'Manufacturing' },
  { id: 2, parent_id: 1, name: 'Construction materials' },
];

const userData = {
  name: 'John Doe',
  sector_ids: [1, 2],
  agree_to_terms: true,
};

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url === '/api/v1/sectors') {
      return Promise.resolve({ data: sectorsData });
    } else if (url === '/api/v1/users/me') {
      return Promise.resolve({ data: userData });
    }
    return Promise.reject(new Error('not found'));
  });

  axios.post.mockResolvedValue({ data: userData });
});

test('renders Sector Form with default language', async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Sector Form')).toBeTruthy();
  });

  expect(screen.getByLabelText('Name')).toBeTruthy();
  expect(screen.getByLabelText('Sectors')).toBeTruthy();
  expect(screen.getByLabelText('Agree to terms')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy();
});

test('submits the form and shows success message', async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );

  await waitFor(() => {
    expect(screen.getByLabelText('Name')).toBeTruthy();
  });

  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
  fireEvent.change(screen.getByLabelText('Sectors'), { target: { value: [1] } });
  fireEvent.click(screen.getByLabelText('Agree to terms'));

  axios.post.mockResolvedValueOnce({
    data: {
      ...userData,
      name: 'Jane Doe',
    },
  });

  const form = screen.getByTestId('sector-form');
  fireEvent.submit(form);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith('/api/v1/users', expect.any(Object));
  });

  const successMessage = await screen.findByText(/form submitted successfully!/i, {}, { timeout: 5000 });
  expect(successMessage).toBeTruthy();
});

test('changes language and updates the form labels', async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Sector Form')).toBeTruthy();
  });

  fireEvent.click(screen.getByRole('button', { name: 'Estonian' }));

  await waitFor(() => {
    expect(screen.getByText('Sektori Vorm')).toBeTruthy();
  });

  expect(screen.getByLabelText('Nimi')).toBeTruthy();
});

test('logs out user and clears form data', async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );

  // Wait for initial data to be loaded
  await waitFor(() => {
    expect(screen.getByLabelText(/name|nimi/i)).toBeTruthy();
    expect(screen.getByLabelText(/name|nimi/i).value).toBe('John Doe');
  });

  // Log out user
  fireEvent.click(screen.getByRole('button', { name: /sectorForm.logout/i }));

  // Check if the form data is cleared
  await waitFor(() => {
    expect(screen.getByLabelText(/name|nimi/i).value).toBe('');
    expect(screen.getByLabelText(/sectors|sektorid/i).value).toBe('');
    expect(screen.getByLabelText(/agree to terms|nõustun tingimustega/i).checked).toBeFalsy();
  });
});
