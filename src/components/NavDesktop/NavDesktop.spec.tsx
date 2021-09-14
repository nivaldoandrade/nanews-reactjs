import { render, screen } from '@testing-library/react';
import { NavDesktop } from '.';

jest.mock('next/router', () => {
	return {
		useRouter() {
			return {
				asPath: '/'
			}
		}
	}
});

jest.mock('next-auth/client', () => {
	return {
		useSession() {
			return [null, false]
		}
	}
});

describe('NavDesktop Component', () => {
	it('should be render correctly', () => {
		render(<NavDesktop />)

		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Posts')).toBeInTheDocument();
	})
})