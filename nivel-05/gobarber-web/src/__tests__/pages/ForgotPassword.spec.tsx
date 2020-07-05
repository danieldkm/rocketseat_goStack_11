import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import ForgotPassword from '../../pages/ForgotPassword';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});
jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ForgotPassword page', () => {
  it('should be able to render a page ForgotPassword', () => {
    const { getByText } = render(<ForgotPassword />);

    const textElement = getByText('Recuperar senha');

    expect(textElement).toBeTruthy();
  });

  it('should not be able to recover with invalid e-mail', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });

  it('should be able to recover forgot password', async () => {
    apiMock.onPost('/password/forgot').reply(200, {});

    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' }),
      );
    });
  });
});
