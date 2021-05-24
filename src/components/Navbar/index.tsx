import { SingInButton } from '../SingInButton';
import { ActiveLink } from '../ActiveLink';

import styles from './navbar.module.scss';

export function Navbar() {
	return (
		<nav>
			<img src="/images/logo.svg" alt="ig.news" />

			<SingInButton />

			<div >

				<div className={styles.navMobile}>
					<nav>
						<ActiveLink activeClassName={styles.active} href="/">
							<a onClick={() => { }}>Home</a>
						</ActiveLink>
						<ActiveLink activeClassName={styles.active} href="/posts">
							<a onClick={() => { }}>Posts</a>
						</ActiveLink>
					</nav>
				</div>
			</div>
		</nav>
	);
}