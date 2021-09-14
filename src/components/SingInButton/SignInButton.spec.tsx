import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';

import { SingInButton } from '.';

jest.mock('next-auth/client');
const sessionMocked = mocked(useSession);

describe('SignInButton Component', () => {
	it('should be render correctly without authenticated user', () => {
		sessionMocked.mockReturnValueOnce([null, false]);

		render(<SingInButton />);

		expect(screen.getByText('Sing in with GitHub')).toBeInTheDocument();
	})

	it('should be render correctly with authenticated user', () => {
		sessionMocked.mockReturnValueOnce([
			{
				user: {
					name: 'Jonh Doe',
					email: 'jonhdoe@mail.com'
				},
				expires: 'fake-expires'
			},
			false
		])

		render(<SingInButton />)

		expect(screen.getByText('Jonh Doe')).toBeInTheDocument();
	})


})