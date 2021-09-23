import { ReactElement, cloneElement, useState, useEffect } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
	children: ReactElement;
	activeClassName?: string;
}

export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
	const [className, setClassName] = useState('');
	const { asPath } = useRouter();

	useEffect(() => {
		(
			asPath === rest.href ||
			asPath.substring(0, asPath.indexOf("/", 1)) === rest.href
		)
			? setClassName(activeClassName)
			: setClassName('')

	}, [asPath, rest.href])

	return (
		<Link {...rest} passHref={true}>
			{cloneElement(children, { className })}
		</Link>
	)
}