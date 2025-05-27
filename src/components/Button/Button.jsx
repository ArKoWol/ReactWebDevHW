import React from 'react';
import './Button.css';

export function Button({
	children,
	onClick,
	type = 'button',
	disabled = false,
	className = '',
}) {
	return (
		<button
			className={`custom-button ${className}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
