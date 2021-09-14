import { ActiveLink } from '../ActiveLink';
import { SingInButton } from '../SingInButton';

import styles from './styles.module.scss';

export function NavDesktop() {
	return (
		<div className={styles.contentNavDesktop}>
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
			<SingInButton />
		</div>
	)
}