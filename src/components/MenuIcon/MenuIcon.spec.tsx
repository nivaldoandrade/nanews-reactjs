import { render, screen } from '@testing-library/react';
import { MenuIcon } from '.';

describe('MenuIcon Component', () => {
	it('should be render correctly', () => {
		render(<MenuIcon isToggle={false} />)

		expect(screen.getByTestId('menuButton-element')).toBeInTheDocument();
	})

	it('it should be isActive classname if isToggle be true', () => {
		render(<MenuIcon isToggle={true} />)

		const menuIcon = screen.getByTestId('menuButton-element');
		const divOne = screen.getByTestId('div-one');
		const divTwo = screen.getByTestId('div-two');
		const divThree = screen.getByTestId('div-three');


		expect(menuIcon).toBeInTheDocument();
		expect(menuIcon).toHaveClass('isActive');
		expect(menuIcon).toContainElement(divOne);
		expect(menuIcon).toContainElement(divTwo);
		expect(menuIcon).toContainElement(divThree);
	})
})