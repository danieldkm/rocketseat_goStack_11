import React from 'react';

import { render } from '@testing-library/react';
import ToastContainer from '../../components/ToastContainer';

import { ToastMessage } from '../../hooks/toast';

const mockMessage: ToastMessage = {
  id: 'test-id-123',
  title: 'test-toast',
  // description: 'test-description',
};
const mockMessages: ToastMessage[] = [mockMessage];

describe('ToastContainer component', () => {
  it('should be able to render an ToastContainer', () => {
    const { getByText } = render(<ToastContainer messages={mockMessages} />);

    expect(getByText('test-toast')).toBeTruthy();
  });
});
