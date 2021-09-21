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

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});


global.window.matchMedia('(max-width: 1000px)');



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

		screen.logTestingPlaygroundURL();

		const menuIconElement = screen.getByTestId('menuButton-element');

		fireEvent.click(menuIconElement);

		const navMobileComponent = screen.getByTestId('navMobile-component');

		expect(navMobileComponent).toBeInTheDocument();
	})
})