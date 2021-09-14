import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface MenuIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isToggle: boolean;
}

export function MenuIcon({ isToggle, ...rest }: MenuIconProps) {

	return (
		<button
			data-testid="menuButton-element"
			className={isToggle
				? `${styles.menuButton} ${styles.isActive}`
				: `${styles.menuButton}`}
			type="button"
			{...rest}
		>
			<div data-testid="div-one" className={styles.one} />
			<div data-testid="div-two" className={styles.two} />
			<div data-testid="div-three" className={styles.three} />
		</button>
	);
}