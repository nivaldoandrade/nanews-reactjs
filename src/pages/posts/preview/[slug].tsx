import { GetStaticProps, GetStaticPaths } from "next"
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import PrismicDom from 'prismic-dom';
import { useEffect } from "react";

import { getPrismic } from "../../../services/prismic";

import { SessionProps as UseSession } from '../../../types/session';

import styles from '../post.module.scss';

interface PostPreviewProps {
	post: {
		slug: string;
		title: string;
		content: string;
		updatedAt: string;
	}
}

export default function postPreview({ post }: PostPreviewProps) {
	const [session] = useSession() as [UseSession, boolean];
	const router = useRouter();

	useEffect(() => {
		if (session?.userActivationSubscription) {
			router.push(`/posts/${post.slug}`);
		}
	}, [session])
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
						className={`${styles.postContent} ${styles.previewContent}`}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
					<div className={styles.subscribeContent}>
						<strong>
							Wanna continue reading?
							<Link href="/">
								<a>Subscribe now</a>
							</Link>
							 🤗
						</strong>
					</div>
				</article>
			</main>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking"
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params;

	const prismic = getPrismic();

	const response = await prismic.getByUID('post', String(slug), {});

	const post = {
		slug,
		title: PrismicDom.RichText.asText(response.data.title),
		content: PrismicDom.RichText.asHtml(response.data.content.splice(0, 3)),
		updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		})
	}

	return {
		props: { post },
		revalidate: 60 * 30 //30min
	}
}