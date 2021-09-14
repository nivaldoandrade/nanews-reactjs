import { render, screen } from '@testing-library/react';
import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { useSession } from 'next-auth/client';
import { useRouter } from "next/router";
import { mocked } from 'ts-jest/utils';

import { getPrismic } from '../../services/prismic';

const post = {
	slug: 'fake-post-slug',
	title: 'fake-post-title',
	content: 'fake-post-content',
	updatedAt: 'fake-post-updatedAt'
}

jest.mock('next-auth/client');
jest.mock('next/router');
jest.mock('../../services/prismic');

const useSessionMocked = mocked(useSession);
const useRouterMocked = mocked(useRouter);
const getPrismicMocked = mocked(getPrismic);

describe('PostPreview page', () => {
	it('should be render correctly', () => {
		useSessionMocked.mockReturnValueOnce([null, false]);

		render(<PostPreview post={post} />);

		expect(screen.getByText('Subscribe now')).toBeInTheDocument();
		expect(screen.getByText(post.title)).toBeInTheDocument();
		expect(screen.getByText(post.content)).toBeInTheDocument();
		expect(screen.getByText(post.updatedAt)).toBeInTheDocument();
	})

	it('should be redirect to post page if user have subscription', () => {
		useSessionMocked.mockReturnValueOnce([{
			userActivationSubscription: [{
				fakeSubscription: 'fake-post-subscription'
			}]
		}, false] as any)

		const pushMock = jest.fn();

		useRouterMocked.mockReturnValueOnce({
			push: pushMock
		} as any)

		render(<PostPreview post={post} />)

		expect(pushMock).toBeCalledWith(`/posts/${post.slug}`)
	})

	it('should be loads initial data', async () => {
		getPrismicMocked.mockReturnValueOnce({
			getByUID: jest.fn().mockResolvedValueOnce({
				data: {
					title: [{ type: 'heading', text: 'fake-post-data-title' }],
					content: [{ type: 'paragraph', text: 'fake-post-data-content' }]
				},
				last_publication_date: '09-09-2021'
			})
		} as any)

		const response = await getStaticProps({
			params: { slug: post.slug }
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
