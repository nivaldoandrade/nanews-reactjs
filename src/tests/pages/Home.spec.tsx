import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';


import Home, { getStaticProps } from '../../pages/index';

import { stripe } from '../../services/stripe';

jest.mock('next-auth/client', () => {
	return {
		useSession() {
			return [null, false]
		}
	}
})

jest.mock('../../services/stripe');

const stripePricesRetrieveMocked = mocked(stripe.prices.retrieve)

describe('Home Page', () => {
	it('should be render correctly', () => {

		render(<Home
			product={{
				priceID: 'fake-priceID',
				amount: '$9,90'
			}}
		/>)

		expect(screen.getByText(/\$9,90/)).toBeInTheDocument();
	})

	it('shoud be loads initial data', async () => {
		stripePricesRetrieveMocked.mockResolvedValueOnce({
			id: 'fake-priceID',
			unit_amount: 990,
		} as any);

		const response = await getStaticProps({});

		expect(response).toEqual(
			expect.objectContaining({
				props: {
					product: {
						priceID: 'fake-priceID',
						amount: '$9.90'
					}
				}
			})
		)
	})
});