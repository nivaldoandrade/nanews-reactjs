import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
	children: ReactElement;
	activeClassName?: string;
}

export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
	const { asPath } = useRouter();
	// teste1
	// teste2
	const className =
		(asPath === rest.href || asPath.substring(0, asPath.indexOf("/", 1)) === rest.href)
			? activeClassName
			: ''

	return (
		<Link {...rest} passHref={true}>
			{cloneElement(children, { className })}
		</Link>
	)
}