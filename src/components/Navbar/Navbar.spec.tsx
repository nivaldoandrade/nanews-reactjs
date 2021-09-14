import { fireEvent, render, screen, } from '@testing-library/react';

import { Navbar } from '.';

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
})


describe('Navbar Component', () => {
	it('should be render correctly', () => {
		render(<Navbar />);

		const navMobileElement = screen.getByTestId('navMobile-element');
		const navDesktopElement = screen.getByTestId('navDesktop-element');

		expect(navMobileElement).toBeInTheDocument();
		expect(navDesktopElement).toBeInTheDocument();
	})
	it('should be render component NavMobile if click button MenuIcon', () => {
		render(<Navbar />);

		const menuIconElement = screen.getByTestId('menuButton-element');

		fireEvent.click(menuIconElement);

		const navMobileComponent = screen.getByTestId('navMobile-component');

		expect(navMobileComponent).toBeInTheDocument();
	})
})