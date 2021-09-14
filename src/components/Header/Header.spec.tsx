import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';

import { Header } from '.';

jest.mock('next/router', () => {
	return {
		useRouter() {
			return {
				asPath: '/'
			}
		}
	}
});

jest.mock('next-auth/client');

describe('Header Component', () => {
	it('should be render Header Component', () => {
		const sessionMocked = useSession as jest.MockedFunction<typeof useSession>;

		sessionMocked.mockReturnValueOnce([null, false]);

		render(<Header />);

		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Posts')).toBeInTheDocument();
	})
})