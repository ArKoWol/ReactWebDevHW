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
	const [quantity, setQuantity] = useState<string>('1');

	const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;
		// Разрешаем пустые значения и числа от 0 до 99
		if (value === '' || (!isNaN(parseInt(value)) && parseInt(value) >= 0)) {
			// Если число больше 99, устанавливаем 99
			if (!isNaN(parseInt(value)) && parseInt(value) > 99) {
				setQuantity('99');
			} else {
				setQuantity(value);
			}
		}
	};

	const handleQuantityBlur = (): void => {
		// Если поле пустое или содержит некорректное значение, устанавливаем 1
		if (quantity === '' || isNaN(parseInt(quantity)) || parseInt(quantity) < 1) {
			setQuantity('1');
		} else if (parseInt(quantity) > 99) {
			setQuantity('99');
		}
	};

	const handleAddToCart = (): void => {
		if (onAddToCart) {
			// Определяем финальное количество с учетом ограничений
			let finalQuantity = quantity === '' || isNaN(parseInt(quantity)) || parseInt(quantity) < 1 
				? 1 
				: parseInt(quantity);
			
			// Ограничиваем максимальное значение
			finalQuantity = Math.min(finalQuantity, 99);
			
			// Обновляем состояние, если нужно
			if (quantity === '' || isNaN(parseInt(quantity)) || parseInt(quantity) < 1) {
				setQuantity('1');
			} else if (parseInt(quantity) > 99) {
				setQuantity('99');
			}
			
			onAddToCart(finalQuantity);
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
						type="number"
						value={quantity}
						onChange={handleQuantityChange}
						onBlur={handleQuantityBlur}
						className="menu-quantity-input"
						min="1"
						max="99"
					/>
					<Button onClick={handleAddToCart}>Add to Cart</Button>
				</div>
			</div>
		</div>
	);
}
