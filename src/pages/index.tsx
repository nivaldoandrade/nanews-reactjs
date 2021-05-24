import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/client';

import { stripe } from '../services/stripe';

import { SubscribeButton } from '../components/SubscribeButton';

import { priceFormatted } from '../utils/format';

import { SessionProps as UseSession } from '../types/session';

import styles from './home.module.scss';
import { useState } from 'react';


interface HomeProps {
	product: {
		priceID: string;
		amount: string;
	}
}

export default function Home({ product }: HomeProps) {
	const [session] = useSession() as [UseSession, boolean];


	return (
		<>
			<Head>
				<title>Inicio - na.news</title>
			</Head>
			<main className={styles.contentContainer}>
				<section className={styles.hero}>
					<span>👏 Hey {session?.user.name}, welcome</span>
					<h1>
						News about <br />
						the <span>React</span> world
					</h1>
					{session?.userActivationSubscription
						? ''
						: (
							<p>
								Get acess to all the publications<br />
								<span>for {product.amount} month</span>
							</p>
						)
					}

					<SubscribeButton priceID={product.priceID} />
				</section>
				<img src="/images/avatar.svg" alt="Girl coding" />
			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const price = await stripe.prices.retrieve('price_1IgUUwJdLY5jK7s0as0pKfVv');

	const product = {
		priceID: price.id,
		amount: priceFormatted.format(price.unit_amount / 100)
	}

	return {
		props: {
			product
		},
		revalidate: 60 * 60 * 24 //24 horas
	}
}
