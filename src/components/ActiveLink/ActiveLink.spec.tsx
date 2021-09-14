import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
	return {
		useRouter() {
			return {
				asPath: '/'
			}
		}
	}
})

describe('ActiveLink Component', () => {
	it('should be render correctly', () => {
		render(
			<ActiveLink href="/" activeClassName="active">
				<a>Home</a>
			</ActiveLink>
		)

		expect(screen.getByText('Home')).toBeInTheDocument();
	})

	it('should be active if received active class', () => {
		render(
			<ActiveLink href="/" activeClassName="active">
				<a>Home</a>
			</ActiveLink>
		)

		expect(screen.getByText('Home')).toHaveClass('active');
	})

	it('not should be link if asPath is not equal to href', () => {
		render(
			<ActiveLink href="/no-href" activeClassName="active">
				<a>Home</a>
			</ActiveLink>
		)

		expect(screen.getByText('Home')).not.toHaveClass();
	})
})