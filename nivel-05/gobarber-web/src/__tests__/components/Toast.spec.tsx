import React from 'react';

import { render, wait, fireEvent } from '@testing-library/react';
import Toast from '../../components/ToastContainer/Toast';

import { ToastMessage } from '../../hooks/toast';

const mockMessage: ToastMessage = {
  id: 'test-id-123',
  title: 'test-toast',
  description: 'test-description',
};
const mockMessages: ToastMessage[] = [mockMessage];

describe('Toast component', () => {
  it('should be able to render an Toast', () => {
    const { getByText } = render(<Toast style={{}} message={mockMessage} />);

    expect(getByText('test-toast')).toBeTruthy();
  });

  // it('should be able to remove an Toast', async () => {
  //   const { getByTestId } = render(<Toast style={{}} message={mockMessage} />);

  //   const buttonElement = getByTestId('toast-button');

  //   fireEvent.click(buttonElement);

  //   await wait(() => {
  //     console.log('mockMessage', mockMessage);
  //   });
  // });

  it('should be able to render an Toast with icon success', async () => {
    const { getByTestId } = render(
      <Toast
        style={{}}
        message={
          {
            id: 'test-id-1234',
            title: 'test-icons',
            description: 'test-description',
            type: 'success',
          } as ToastMessage
        }
      />,
    );

    const containerElement = getByTestId('toast-container');
    const iconElement = getByTestId('toast-success-icon');

    await wait(() => {
      expect(containerElement).toHaveStyle('background: #e6fffa');
      expect(containerElement).toHaveStyle('color: #2e656a');
      expect(iconElement).toBeTruthy();
    });
  });

  it('should be able to render an Toast with icon error', async () => {
    const { getByTestId } = render(
      <Toast
        style={{}}
        message={
          {
            id: 'test-id-1234',
            title: 'test-icons',
            description: 'test-description',
            type: 'error',
          } as ToastMessage
        }
      />,
    );

    const containerElement = getByTestId('toast-container');
    const iconElement = getByTestId('toast-error-icon');

    await wait(() => {
      expect(containerElement).toHaveStyle('background: #fddede');
      expect(containerElement).toHaveStyle('color: #c53030');
      expect(iconElement).toBeTruthy();
    });
  });

  it('should be able to render an Toast with icon info', async () => {
    const { getByTestId } = render(
      <Toast
        style={{}}
        message={
          {
            id: 'test-id-1234',
            title: 'test-icons',
            description: 'test-description',
            type: 'info',
          } as ToastMessage
        }
      />,
    );

    const containerElement = getByTestId('toast-container');
    const iconElement = getByTestId('toast-info-icon');

    await wait(() => {
      expect(containerElement).toHaveStyle('background: #ebf8ff');
      expect(containerElement).toHaveStyle('color: #3172b7');
      expect(iconElement).toBeTruthy();
    });
  });
});
