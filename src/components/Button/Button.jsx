import React from 'react';
import './Button.css';

export function Button({ children, onClick }) {
	return (
		<button className="custom-button" onClick={onClick}>
			{children}
		</button>
	);
}
