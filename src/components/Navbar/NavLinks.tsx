import { ActiveLink } from '../ActiveLink';
import { SingInButton } from '../SingInButton';

import styles from './navLinks.module.scss';

export function NavLinks() {


	return (
		<nav className={styles.navMobile}>
			<ActiveLink href="/">
				<a>Home</a>
			</ActiveLink>
			<ActiveLink href="/posts">
				<a>Posts</a>
			</ActiveLink>
			<SingInButton />
		</nav>

	)
}