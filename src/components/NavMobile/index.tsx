import { ActiveLink } from '../ActiveLink';
import { SingInButton } from '../SingInButton';

import styles from './styles.module.scss';

export function NavMobile() {
	return (
		<div
			className={styles.contentNavMobile}
			data-testid="navMobile-component"
		>
			<ActiveLink href="/">
				<a>Home</a>
			</ActiveLink>
			<ActiveLink href="/posts">
				<a>Posts</a>
			</ActiveLink>
			<SingInButton />
		</div>
	)
}