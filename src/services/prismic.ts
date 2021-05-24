import Prismic from '@prismicio/client';

export function getPrismic(req?: unknown) {
	return Prismic.client(
		process.env.PRISMIC_ENDPOINT,
		{
			accessToken: process.env.PRISMIC_ACCESS_TOKEN,
			req
		}
	)
}