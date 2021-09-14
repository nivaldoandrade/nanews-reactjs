import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Navbar } from '../Navbar';

import styles from './styles.module.scss';

export function Header() {
	const [isToggle, setIsToggle] = useState(false);

	const { asPath } = useRouter();

	useEffect(() => {
		setIsToggle(false);
	}, [asPath]);

	function activeMenuMobile() {
		setIsToggle(state => !state);
	}

	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Link href="/">
					<a>
						<img src="/images/logo.svg" alt="ig.news" />
					</a>
				</Link>

				<Navbar />
			</div>
		</header>
	)
}