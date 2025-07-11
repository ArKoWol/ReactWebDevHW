import './MenuCard.css';
import { Button } from '../Button/Button';
import React, { useState, ChangeEvent } from 'react';
import { MenuItem } from '../../types';

type MenuCardProps = Omit<MenuItem, 'id' | 'category'> & {
	onAddToCart: (quantity: number) => void;
};

export function MenuCard({
	image,
	title,
	price,
	description,
	onAddToCart,
}: MenuCardProps): React.JSX.Element {
	const [quantity, setQuantity] = useState<number>(1);

	const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const value = parseInt(event.target.value);
		if (!isNaN(value) && value > 0) {
			setQuantity(value);
		}
	};

	const handleAddToCart = (): void => {
		if (onAddToCart) {
			onAddToCart(quantity);
		}
	};

	return (
		<div className="menuCard">
			<div className="menu-img">
				<img src={image} alt={title} />
			</div>
			<div className="menu-content">
				<div className="card-name-and-price">
					<h1 className="menu-card-title">{title}</h1>
					<h1 className="menu-card-prise">$ {price} USD</h1>
				</div>
				<div className="card-info">
					<p>{description}</p>
				</div>
				<div className="menu-add-buttons">
					<input
						type="text"
						value={quantity}
						onChange={handleQuantityChange}
						className="menu-text-input"
					/>
					<Button onClick={handleAddToCart}>Add to Cart</Button>
				</div>
			</div>
		</div>
	);
}
