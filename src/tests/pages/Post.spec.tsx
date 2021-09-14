import { render, screen } from '@testing-library/react';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';

import { getPrismic } from '../../services/prismic';


jest.mock('next-auth/client');
jest.mock('../../services/prismic')

const getSessionMocked = mocked(getSession);
const getPrismicMocked = mocked(getPrismic);

const post = {
	slug: 'fake-post-slug',
	title: 'fake-post-title',
	content: '<p>fake-post-content</p>',
	updatedAt: 'fake-post-updatedAt'
}

describe('Post Page', () => {
	it('should be render correctly', () => {
		render(<Post post={post} />);

		expect(screen.getByText(post.title)).toBeInTheDocument();
		expect(screen.getByText('fake-post-content')).toBeInTheDocument();
		expect(screen.getByText(post.updatedAt)).toBeInTheDocument();
	})

	it('should be redirect if non-existing active subscription', async () => {
		getSessionMocked.mockReturnValueOnce(null);

		const slug = 'fake-post-slug';

		const response = await getServerSideProps({
			params: { slug }
		} as any);

		expect(response).toEqual(
			expect.objectContaining({
				redirect: expect.objectContaining({
					destination: `/posts/preview/${slug}`
				})
			})
		)
	})

	it('should be loads initial data if existing active subscription', async () => {
		getSessionMocked.mockResolvedValueOnce({
			userActivationSubscription: [{
				fakeSubscription: 'fake-user-activation-subscription'
			}]
		} as any)

		getPrismicMocked.mockReturnValueOnce({
			getByUID: jest.fn().mockResolvedValueOnce({
				data: {
					title: [{ type: 'heading', text: 'fake-post-data-title' }],
					content: [{ type: 'paragraph', text: 'fake-post-data-content' }]
				},
				last_publication_date: '09-09-2021'
			})
		} as any)

		const slug = 'fake-post-slug';

		const response = await getServerSideProps({
			params: { slug }
		} as any);

		expect(response).toEqual(
			expect.objectContaining({
				props: {
					post: {
						slug: 'fake-post-slug',
						title: 'fake-post-data-title',
						content: '<p>fake-post-data-content</p>',
						updatedAt: '09 de setembro de 2021'
					}
				}
			})
		)
	})
})