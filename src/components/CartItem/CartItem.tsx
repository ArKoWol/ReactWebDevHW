import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateQuantity, removeFromCart, syncCartAfterChange } from '../../store/slices/cartSlice';
import { CartItem as CartItemType } from '../../store/slices/cartSlice';
import './CartItem.css';

interface CartItemProps {
	item: CartItemType;
}

export function CartItem({ item }: CartItemProps): React.ReactElement {
	const dispatch = useAppDispatch();
	const { items: cartItems } = useAppSelector((state) => state.cart);
	const { currentUser } = useAppSelector((state) => state.auth);
	const [quantity, setQuantity] = useState(item.quantity > 99 ? '99+' : item.quantity.toString());

	// Синхронизируем локальное состояние с Redux состоянием
	useEffect(() => {
		setQuantity(item.quantity > 99 ? '99+' : item.quantity.toString());
	}, [item.quantity]);

	const handleQuantityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		
		// Если значение пустое или число
		if (value === '' || (!isNaN(parseInt(value)) && parseInt(value) > 0)) {
			const numValue = parseInt(value);
			
			// Если число больше 99, устанавливаем 99
			if (!isNaN(numValue)) {
				if (numValue > 99) {
					setQuantity('99');
					dispatch(updateQuantity({ id: item.id, quantity: 99 }));
					if (currentUser) {
						const updatedItems = cartItems.map(cartItem => 
							cartItem.id === item.id 
								? { ...cartItem, quantity: 99 }
								: cartItem
						);
						dispatch(syncCartAfterChange(updatedItems));
					}
				} else {
					setQuantity(value);
					dispatch(updateQuantity({ id: item.id, quantity: numValue }));
					if (currentUser) {
						const updatedItems = cartItems.map(cartItem => 
							cartItem.id === item.id 
								? { ...cartItem, quantity: numValue }
								: cartItem
						);
						dispatch(syncCartAfterChange(updatedItems));
					}
				}
			} else {
				setQuantity(value);
			}
		}
	};

	const handleRemoveItem = async () => {
		dispatch(removeFromCart(item.id));
		if (currentUser) {
			const updatedItems = cartItems.filter(cartItem => cartItem.id !== item.id);
			dispatch(syncCartAfterChange(updatedItems));
		}
	};

	return (
		<div className="cart-item">
			<img src={item.image} alt={item.title} className="cart-item-image" />
			<div className="cart-item-details">
				<h3 className="cart-item-name">{item.title}</h3>
			</div>
			<span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
			<input
				type="number"
				value={quantity === '99+' ? '99' : quantity}
				onChange={handleQuantityChange}
				className="cart-item-quantity-input"
				min="1"
				max="99"
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