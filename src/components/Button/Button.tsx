import React from 'react';
import './Button.css';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	className?: string;
}

export function Button({
	children,
	onClick,
	type = 'button',
	disabled = false,
	className = '',
}: ButtonProps): React.ReactElement {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onClick?.();
	};

	return (
		<button
			className={`custom-button ${className}`}
			onClick={handleClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
