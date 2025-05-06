import React from 'react';
import './MenuSelector.css';

export function MenuSelector({ categories, selectedMenu, onMenuChange }) {
	return (
		<div className="menu-select">
			{categories.map((category, index) => (
				<div key={index} className="radio-item-menu">
					<input
						type="radio"
						id={category.id}
						name="menus-radio-group"
						checked={selectedMenu === category.id}
						onChange={() => onMenuChange(category.id)}
					/>
					<label htmlFor={category.id}>{category.label}</label>
				</div>
			))}
		</div>
	);
}
