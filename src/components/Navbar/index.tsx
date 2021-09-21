import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { MenuIcon } from '../MenuIcon'
import { NavDesktop } from '../NavDesktop';
import { NavMobile } from '../NavMobile';


import styles from './styles.module.scss';


export function Navbar() {
	const [isToggle, setIsToggle] = useState(false);

	const { asPath } = useRouter();

	useEffect(() => {
		setIsToggle(false);
	}, [asPath]);


	function activeMenuMobile() {
		setIsToggle(state => !state);
	}

	return (
		<>
			<nav
				data-testid="navMobile-element"
				className={styles.containerNavMobile}
			>
				<MenuIcon isToggle={isToggle} onClick={activeMenuMobile} />
				{isToggle && <NavMobile />}
			</nav>


			<nav
				data-testid="navDesktop-element"
				className={styles.containerNavDesktop}
			>
				<NavDesktop />
			</nav>
		</>
	)
}

