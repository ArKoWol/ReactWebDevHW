import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { CartItem as CartItemType } from '../../store/slices/cartSlice';
import './CartItem.css';

interface CartItemProps {
	item: CartItemType;
}

export function CartItem({ item }: CartItemProps): React.ReactElement {
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState(item.quantity.toString());

	// Синхронизируем локальное состояние с Redux состоянием
	useEffect(() => {
		setQuantity(item.quantity.toString());
	}, [item.quantity]);

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuantity(value);
		
		const numValue = parseInt(value);
		if (!isNaN(numValue) && numValue > 0) {
			dispatch(updateQuantity({ id: item.id, quantity: numValue }));
		}
	};

	const handleRemoveItem = () => {
		dispatch(removeFromCart(item.id));
	};

	return (
		<div className="cart-item">
			<img src={item.image} alt={item.title} className="cart-item-image" />
			<div className="cart-item-details">
				<h3 className="cart-item-name">{item.title}</h3>
			</div>
			<span className="cart-item-price">${item.price.toFixed(2)}</span>
			<input
				type="number"
				value={quantity}
				onChange={handleQuantityChange}
				className="cart-item-quantity-input"
				min="1"
			/>
			<button 
				className="remove-button" 
				onClick={handleRemoveItem}
			>
				×
			</button>
		</div>
	);
} 