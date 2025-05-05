import './MenuCard.css';
import { Button } from '../Button/Button.jsx';
import React, { useState } from 'react';

export function MenuCard({ image, title, price, description, onAddToCart }) {
	const [quantity, setQuantity] = useState(1);

	const handleQuantityChange = (event) => {
		const value = parseInt(event.target.value);
		if (!isNaN(value) && value > 0) {
			setQuantity(value);
		}
	};

	const handleAddToCart = () => {
		onAddToCart(quantity);
	};

	return (
		<div className="menuCard">
			<div className="menu-img">
				<img src={image} alt="" />
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
