import React from 'react';
import MockAdapter from 'axios-mock-adapter';

import { render, wait } from '@testing-library/react';

import Dashboard from '../../pages/Dashboard';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

const user = {
  id: 'user-123',
  name: 'John Doe',
  email: 'johndoe@example.com.br',
  avatar_url: 'avatar-url-john-doe',
};
const mockedSignIn = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
      signOut: jest.fn(),
      updateUser: jest.fn(),
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'johndoe@example.com.br',
        avatar_url: 'avatar-url-john-doe',
      },
    }),
  };
});

describe('Dashboard page', () => {
  beforeEach(async () => {
    const apiResponse = [
      {
        day: 1,
        available: false,
      },
      {
        day: 2,
        available: false,
      },
      {
        day: 3,
        available: false,
      },
      {
        day: 4,
        available: false,
      },
      {
        day: 5,
        available: false,
      },
    ];
    apiMock
      .onGet(`/providers/${user.id}/month-availability`)
      .reply(200, apiResponse);

    apiMock.onGet('/appointments/me').reply(200, [
      {
        id: '8bd2bb8c-1a3d-44cf-ab7e-47c7925f51dc',
        provider_id: 'b90fa04f-280e-4ac8-ae5e-4e440ddcc2ce',
        user_id: 'd2d5dc33-f82a-44de-ad52-7f86c1ffe21c',
        date: '2020-05-29T17:00:00.000Z',
        created_at: '2020-05-29T16:54:37.322Z',
        updated_at: '2020-05-29T16:54:37.322Z',
        user: {
          id: 'd2d5dc33-f82a-44de-ad52-7f86c1ffe21c',
          name: 'Morita',
          email: 'morita@hotmail.com',
          avatar:
            'bf33cfc6ca3cb83e20f6-82860730_862138547569725_6031012722223611904_n.jpg',
          created_at: '2020-05-03T00:18:08.362Z',
          updated_at: '2020-05-31T15:33:19.446Z',
          avatar_url:
            'http://localhost:3333/files/bf33cfc6ca3cb83e20f6-82860730_862138547569725_6031012722223611904_n.jpg',
        },
      },
      {
        id: 'bc35651b-7804-43f7-bb9b-06d87a2f6d4c',
        provider_id: 'b90fa04f-280e-4ac8-ae5e-4e440ddcc2ce',
        user_id: 'd2d5dc33-f82a-44de-ad52-7f86c1ffe21c',
        date: '2020-05-29T19:00:00.000Z',
        created_at: '2020-05-29T16:55:50.079Z',
        updated_at: '2020-05-29T16:55:50.079Z',
        user: {
          id: 'd2d5dc33-f82a-44de-ad52-7f86c1ffe21c',
          name: 'Morita',
          email: 'morita@hotmail.com',
          avatar:
            'bf33cfc6ca3cb83e20f6-82860730_862138547569725_6031012722223611904_n.jpg',
          created_at: '2020-05-03T00:18:08.362Z',
          updated_at: '2020-05-31T15:33:19.446Z',
          avatar_url:
            'http://localhost:3333/files/bf33cfc6ca3cb83e20f6-82860730_862138547569725_6031012722223611904_n.jpg',
        },
      },
      {
        id: '59475179-f01b-401d-a168-536a6ec4e4e0',
        provider_id: 'b90fa04f-280e-4ac8-ae5e-4e440ddcc2ce',
        user_id: 'd2d5dc33-f82a-44de-ad52-7f86c1ffe21c',
        date: '2020-05-29T20:00:00.000Z',
        created_at: '2020-05-29T16:55:52.692Z',
        updated_at: '2020-05-29T16:55:52.692Z',
        user: {
          id: 'd2d5dc33-f82a-44de-ad52-7f86c1ffe21c',
          name: 'Morita',
          email: 'morita@hotmail.com',
          avatar:
            'bf33cfc6ca3cb83e20f6-82860730_862138547569725_6031012722223611904_n.jpg',
          created_at: '2020-05-03T00:18:08.362Z',
          updated_at: '2020-05-31T15:33:19.446Z',
          avatar_url:
            'http://localhost:3333/files/bf33cfc6ca3cb83e20f6-82860730_862138547569725_6031012722223611904_n.jpg',
        },
      },
    ]);
  });
  it('should be able to render an Dashboard', async () => {
    const { getByText } = render(<Dashboard />);

    const textElement = getByText(user.name);

    await wait(() => {
      expect(textElement).toBeTruthy();
    });
  });
});
