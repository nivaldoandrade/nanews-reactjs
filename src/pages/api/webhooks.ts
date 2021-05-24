import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from 'micro';
import Cors from 'micro-cors';
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import saveSubscription from "./_lib/manageSubscription";

export const config = {
	api: {
		bodyParser: false
	}
}

const cors = Cors({
	allowMethods: ['POST', 'HEAD'],
});

const relevantEvents = new Set([
	'checkout.session.completed',
	'invoice.payment_succeeded',
	'customer.subscription.updated',
	'customer.subscription.deleted'
])

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const buf = await buffer(req);
		const sig = req.headers['stripe-signature'];

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET);
		} catch (error) {
			return res.status(400).send(`Webhooks error: ${error.message}`)
		}

		const type = event.type;

		if (relevantEvents.has(type)) {
			try {
				switch (type) {
					case 'customer.subscription.updated':
					case 'customer.subscription.deleted':
						const subscription = event.data.object as Stripe.Subscription;
						await saveSubscription(
							subscription.id,
							subscription.customer.toString(),
							false
						)

						break
					case 'checkout.session.completed':
						const stripeCheckoutSession = event.data.object as Stripe.Checkout.Session;

						await saveSubscription(
							stripeCheckoutSession.subscription.toString(),
							stripeCheckoutSession.customer.toString(),
							true
						)

						break;

					default:
						throw new Error('Unhandled event.')
						break;
				}
			} catch (error) {
				return res.json({ error: 'Webhooks failed.' })
			}

		}

		res.json({ received: true })

	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method not allowed')
	}

}

export default cors(webhookHandler as any);





