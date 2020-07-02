import React from 'react';

import { render } from '@testing-library/react';
import Button from '../../components/Button';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Button component', () => {
  it('should be able to render an button', () => {
    const { getByPlaceholderText } = render(
      <Button type="button" placeholder="Button" />,
    );

    expect(getByPlaceholderText('Button')).toBeTruthy();
  });
  it('should be able to render an button with loading', () => {
    const { getByPlaceholderText } = render(
      <Button type="button" placeholder="Button" loading />,
    );

    expect(getByPlaceholderText('Button')).toBeTruthy();
  });
});
