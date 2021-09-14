import { query as q } from 'faunadb';
import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export default async function saveSubscription(
	subscribeId: string,
	customerId: string,
	isCreate = false,
) {

	const userRef = await fauna.query(
		q.Select(
			"ref",
			q.Get(
				q.Match(
					q.Index('user_stripe_customer_id'),
					customerId
				)
			)
		)
	)

	const subscription = await stripe.subscriptions.retrieve(subscribeId);

	const subscriptionData = {
		id: subscription.id,
		user_id: userRef,
		status: subscription.status,
		price_id: subscription.items.data[0].price.id,
	}

	if (isCreate) {
		await fauna.query(
			q.Create(
				q.Collection('subscriptions'),
				{ data: subscriptionData }
			)
		)
	} else {
		try {
			await fauna.query(
				q.Replace(
					q.Select(
						'ref',
						q.Get(
							q.Match(
								q.Index('subscription_user_id'),
								userRef
							)
						)
					),
					{ data: subscriptionData }
				)
			)
		} catch (error) {
			console.log(error);
		}

	}



}