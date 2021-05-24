import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { ActiveLink } from '../ActiveLink';
import { SingInButton } from '../SingInButton';
import { MenuIcon } from '../Navbar/MenuIcon';

import styles from './styles.module.scss';
import { NavLinks } from '../Navbar/NavLinks';
import Link from 'next/link';

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

				<nav className={styles.navDesktop}>
					<ActiveLink
						activeClassName={styles.active}
						href="/"
					>
						<a>Home</a>
					</ActiveLink>
					<ActiveLink
						activeClassName={styles.active}
						href="/posts"
					>
						<a>Posts</a>
					</ActiveLink>
				</nav>
				<div className={`${styles.divButton} ${styles.navDesktop}`}>
					<SingInButton />
				</div>
				<div className={styles.navMobile}>
					<MenuIcon isToggle={isToggle} onClick={activeMenuMobile} />
					{isToggle && <NavLinks />}
				</div>

			</div>
		</header>
	)
}