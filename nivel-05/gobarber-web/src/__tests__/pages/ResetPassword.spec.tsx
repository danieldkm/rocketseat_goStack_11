import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';

import ResetPassword from '../../pages/ResetPassword';

const apiMock = new MockAdapter(api);

const mockedAddToast = jest.fn();
const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      key: 'ac3df4', // not with HashHistory!
      pathname: '/somewhere',
      search: '?some=search-string',
      hash: '#howdy',
      state: {},
    }),
    // Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ResetPassword page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });
  it('should be able to render an ResetPassword', () => {
    const { getByText } = render(<ResetPassword />);

    const textElement = getByText('Resetar senha');

    expect(textElement).toBeTruthy();
  });

  it('should not be able to reset password with confirmation password does not match', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const novaSenhaField = getByPlaceholderText('Nova Senha');
    const confirmPassField = getByPlaceholderText('Confirmação da senha');
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(novaSenhaField, { target: { value: '123321' } });
    fireEvent.change(confirmPassField, { target: { value: '123' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should be able to reset password', async () => {
    apiMock.onPost('/password/reset').reply(200, {});

    const { getByText, getByPlaceholderText } = render(<ResetPassword />);

    const newPassField = getByPlaceholderText('Nova Senha');
    const confirmPassField = getByPlaceholderText('Confirmação da senha');
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(newPassField, { target: { value: '123' } });
    fireEvent.change(confirmPassField, { target: { value: '123' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });
});
