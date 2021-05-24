import { GetServerSideProps } from "next"
import Head from "next/head";
import { getSession } from 'next-auth/client';
import { getPrismic } from "../../services/prismic";
import PrismicDom from 'prismic-dom';

import { SessionProps as GetSession } from '../../types/session';

import styles from './post.module.scss';

interface PostProps {
	post: {
		slug: string;
		title: string;
		content: string;
		updatedAt: string;
	}
}

export default function Post({ post }: PostProps) {
	return (
		<>
			<Head>
				<title>{`${post.title} - na.news`}</title>
			</Head>

			<main className={styles.container}>
				<article className={styles.post}>
					<h1>{post.title}</h1>
					<time>{post.updatedAt}</time>
					<div
						className={styles.postContent}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</article>
			</main>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
	const session = await getSession({ req }) as GetSession;
	const { slug } = params;

	if (!session?.userActivationSubscription) {
		return {
			redirect: {
				destination: `/posts/preview/${slug}`,
				permanent: false,
			}
		}
	}

	const prismic = getPrismic(req);

	const response = await prismic.getByUID('post', String(slug), {});

	const post = {
		slug,
		title: PrismicDom.RichText.asText(response.data.title),
		content: PrismicDom.RichText.asHtml(response.data.content),
		updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		})
	}

	return {
		props: { post }
	}
}