import { render, screen } from '@testing-library/react';
import { NavMobile } from '.';

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

describe('NavMobile Component', () => {
	it('should be render correctly', () => {
		render(<NavMobile />)

		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Posts')).toBeInTheDocument();
	})
})