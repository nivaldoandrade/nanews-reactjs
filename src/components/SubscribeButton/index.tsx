import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import { SessionProps as UseSession } from '../../types/session';

import styles from './styles.module.scss';


export function SubscribeButton() {
	const [session] = useSession() as [UseSession, boolean];
	const router = useRouter();

	async function handleSubscribe() {
		if (!session) {
			signIn('github');
			return;
		}

		if (session.userActivationSubscription) {
			router.push('/posts');
			return;
		}

		try {
			const response = await api.post('subscribe');
			const { sessionId } = response.data;

			const stripe = await getStripeJs();

			await stripe.redirectToCheckout({ sessionId });
		} catch (error) {
			alert(error.message);
		}
	}

	return (
		<button
			className={styles.subscribeButton}
			type="button"
			onClick={() => handleSubscribe()}
		>
			{session?.userActivationSubscription ? 'Go to Posts' : 'Subscribe now'}
		</button>
	)
}