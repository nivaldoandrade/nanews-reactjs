import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers'

import { fauna } from '../../../services/fauna';

export default NextAuth({
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
	],
	jwt: {
		signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
	},
	callbacks: {
		async session(session, user) {
			try {
				const userActivationSubscription = await fauna.query(
					q.Intersection([
						q.Get(
							q.Match(
								q.Index('subscription_user_id'),
								q.Select(
									'ref',
									q.Get(
										q.Match(
											q.Index('user_email'),
											q.Casefold(session.user.email)
										)
									)
								)
							)
						)],
						[q.Get(
							q.Match(
								q.Index('subscription_status'),
								"active"
							)
						)]
					)
				);

				return {
					...session,
					userActivationSubscription: userActivationSubscription
				}
			} catch {
				return {
					...session,
					userActivationSubscription: null
				}
			}

		},

		async signIn(user, account, profile) {
			const { email } = user;

			try {
				await fauna.query(
					q.If(
						q.Not(
							q.Exists(
								q.Match(
									q.Index('user_email'),
									q.Casefold(email)
								)
							)
						),
						q.Create(
							q.Collection('users'),
							{ data: { email } }
						),
						q.Get(
							q.Match(
								q.Index('user_email'),
								q.Casefold(email)
							)
						)
					)
				)

				return true;
			} catch {
				return false;
			}
		},
	}
})