import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignUn from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();
const mockedSignUp = jest.fn();
const mockedAddToast = jest.fn();

// jest.fn().mockReturnValue
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../services/api', () => {
  return {
    get: jest.fn(),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign up', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUn />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'johndoe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  // it('should not be able to sign in with invalid credentials', async () => {
  //   const { getByPlaceholderText, getByText } = render(<SignUn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
  //   fireEvent.change(passwordField, { target: { value: '123456' } });

  //   fireEvent.click(buttonElement);

  //   await wait(() => {
  //     expect(mockedHistoryPush).not.toHaveBeenCalled();
  //   });
  // });

  // it('should display an error if login fails', async () => {
  //   mockedSignUn.mockImplementation(() => {
  //     throw new Error();
  //   });
  //   const { getByPlaceholderText, getByText } = render(<SignUn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
  //   fireEvent.change(passwordField, { target: { value: '123456' } });

  //   fireEvent.click(buttonElement);

  //   await wait(() => {
  //     expect(mockedAddToast).toHaveBeenCalledWith(
  //       expect.objectContaining({ type: 'error' }),
  //     );
  //   });
  // });
});
