import { Session } from 'next-auth';

export interface SessionProps extends Session {
	userActivationSubscription: object[];
}