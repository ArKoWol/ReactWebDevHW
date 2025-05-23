import React from 'react';
import './Button.css';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
}

export function Button({
	children,
	onClick,
	type = 'button',
}: ButtonProps): React.ReactElement {
	return (
		<button className="custom-button" onClick={onClick} type={type}>
			{children}
		</button>
	);
}
