import React from 'react';
import './MenuSelector.css';

interface Category {
	id: string;
	label: string;
}

interface MenuSelectorProps {
	categories: Category[];
	selectedMenu: string;
	onMenuChange: (id: string) => void;
}

export function MenuSelector({
	categories,
	selectedMenu,
	onMenuChange,
}: MenuSelectorProps): React.ReactElement {
	return (
		<div className="menu-select">
			{categories.map((category, index) => (
				<div key={index} className="checkbox-item-menu">
					<input
						type="checkbox"
						id={category.id}
						name="menus-checkbox-group"
						checked={selectedMenu === category.id}
						onChange={() => onMenuChange(selectedMenu === category.id ? '' : category.id)}
					/>
					<label htmlFor={category.id}>{category.label}</label>
				</div>
			))}
		</div>
	);
}
