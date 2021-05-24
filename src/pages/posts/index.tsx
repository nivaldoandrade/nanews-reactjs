import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import PrismicDoc from 'prismic-dom';

import { getPrismic } from '../../services/prismic';

import styles from './styles.module.scss';

interface Post {
	id: string;
	title: string;
	excerpt: string;
	updatedAt: string;
};

interface PostsProps {
	posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
	return (
		<>
			<Head>
				<title>Posts - na.news</title>
			</Head>

			<main className={styles.container}>
				<div className={styles.posts}>
					{posts.map(post => (
						<Link key={post.id} href={`/posts/${post.id}`} >
							<a>
								<time>{post.updatedAt}</time>
								<strong>{post.title}</strong>
								<p>{post.excerpt}</p>
							</a>
						</Link>
					))}
				</div>
			</main>
		</>
	)
}


export const getStaticProps: GetStaticProps = async () => {
	const prismic = getPrismic();

	const response = await prismic.query(
		Prismic.Predicates.at('document.type', 'post'),
		{
			pageSize: 25,
			fetch: ['post.title', 'post.content'],
		}
	)

	const posts = response.results.map(post => ({
		id: post.uid,
		title: PrismicDoc.RichText.asText(post.data.title),
		excerpt: post.data.content.find(cont => cont.type === 'paragraph')?.text ?? '',
		updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
			day: "2-digit",
			month: "long",
			year: "numeric"
		})
	}))


	return {
		props: { posts },
		revalidate: 60 * 60 * 1 // 1hours
	}
}