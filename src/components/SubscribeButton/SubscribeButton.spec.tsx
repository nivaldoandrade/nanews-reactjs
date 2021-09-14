import { fireEvent, render, screen } from '@testing-library/react';
import { MockedFunction } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import { SessionProps } from '../../types/session';

import { SubscribeButton } from '.';

jest.mock('next-auth/client');
jest.mock('next/router');


const sessionMocked = mocked(useSession) as MockedFunction<() => [SessionProps, boolean]>;
const signInMocked = mocked(signIn);
const useRouterMocked = mocked(useRouter);

describe('Subscribe Button Component', () => {
	it('should be render corretly', () => {
		sessionMocked.mockReturnValue([null, false]);

		render(<SubscribeButton />);

		expect(screen.getByText('Subscribe now')).toBeInTheDocument();
	})

	it('should be redirect to signIn if without authenticated user', () => {
		signInMocked.mockImplementationOnce(jest.fn());

		render(<SubscribeButton />);

		const subscribeButton = screen.getByText('Subscribe now');

		fireEvent.click(subscribeButton);

		expect(signInMocked).toBeCalledWith('github');
	})

	it('should be redirect to posts if user have subscription active', () => {
		const pushMock = jest.fn();

		sessionMocked.mockReturnValueOnce([
			{
				user: {
					name: 'Jonh Doe',
					email: 'jonhdoe@mail.com'
				},
				expires: 'fake-expires',
				userActivationSubscription: [{}]
			},
			false
		]);

		useRouterMocked.mockImplementationOnce(() => ({
			push: pushMock
		}) as any);


		render(<SubscribeButton />);

		const subscribeButton = screen.getByText('Go to Posts');

		fireEvent.click(subscribeButton);

		expect(pushMock).toBeCalledWith('/posts');
	})
});