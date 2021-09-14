import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import Posts, { getStaticProps } from '../../pages/posts/index';

import { getPrismic } from '../../services/prismic';

const posts = [
	{
		id: 'fake-post-id',
		title: 'fake-post-title',
		excerpt: 'fake-post-expect',
		updatedAt: 'fake-post-updateAt'
	}
]

jest.mock('../../services/prismic');

const getPrismicMocked = mocked(getPrismic);

describe('Posts Page', () => {
	it('should be render correctly', () => {
		render(<Posts posts={posts} />)

		expect(screen.getByText(posts[0].title)).toBeInTheDocument();
		expect(screen.getByText(posts[0].excerpt)).toBeInTheDocument();
		expect(screen.getByText(posts[0].updatedAt)).toBeInTheDocument();
	})

	it('should be loads initial data', async () => {
		getPrismicMocked.mockReturnValueOnce({
			query: jest.fn().mockResolvedValueOnce({
				results: [
					{
						uid: 'fake-post-uid',
						data: {
							title: [
								{ type: 'heading', text: 'fake-post-data-title' }
							],
							content: [
								{ type: 'paragraph', text: 'fake-post-data-excerpt' }
							]
						},
						last_publication_date: '09-09-2021'
					}
				]
			})
		} as any)

		const response = await getStaticProps({});

		expect(response).toEqual(
			expect.objectContaining({
				props: {
					posts: [
						{
							id: 'fake-post-uid',
							title: 'fake-post-data-title',
							excerpt: 'fake-post-data-excerpt',
							updatedAt: '09 de setembro de 2021'
						}
					]
				}
			})
		)
	})
})