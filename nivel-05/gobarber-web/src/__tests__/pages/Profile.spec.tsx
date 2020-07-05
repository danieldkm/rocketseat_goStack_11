import React from 'react';

import { render } from '@testing-library/react';

import { Form } from '@unform/web';
import Profile from '../../pages/Profile';

// jest.mock('@unform/web', () => {
//   return {
//     default: () => {
//       return <div />;
//     },
//   };
// });

// jest.mock('@unform/web');

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: jest.fn(),
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
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

// jest.mock('@unform/core', () => {
//   return {
//     useField() {
//       return {
//         fieldName: 'email',
//         defaultValue: '',
//         error: '',
//         registerField: jest.fn(),
//       };
//     },
//   };
// });

// const MockMyComponent = (children) => {
//   return <div>{children}</div>;
// };
// jest.mock('@unform/web', () => ({
//   __esModule: true,
//   namedExport: jest.fn(),
//   default: jest.fn(),
// }));

// Form.propToMock = (props) => {
//   <div>{props.children}</div>;
// };
// jest.setMock('@unform/web/Form', Form);

jest.mock('@unform/web');

describe('Profile page', () => {
  it('should be able to render a page Profile', () => {
    const { getByText } = render(<Profile />);

    // const textElement = getByText('Meu perfil');

    // expect(textElement).toBeTruthy();
  });
});
