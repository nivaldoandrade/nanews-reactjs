import { useState, ButtonHTMLAttributes } from 'react';
import styles from './menuIcon.module.scss';

interface MenuIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isToggle: boolean;
}

export function MenuIcon({ isToggle, ...rest }: MenuIconProps) {

	return (
		<button
			className={isToggle
				? `${styles.menuButton} ${styles.isActive}`
				: `${styles.menuButton}`}
			type="button"
			{...rest}
		>
			<div className={styles.one}></div>
			<div className={styles.two}></div>
			<div className={styles.three}></div>
		</button>
	);
}