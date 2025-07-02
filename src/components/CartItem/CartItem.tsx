import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateQuantity, removeFromCart, syncCartAfterChange } from '../../store/slices/cartSlice';
import { CartItem as CartItemType } from '../../store/slices/cartSlice';
import { Button } from '../Button/Button';
import { QuantityControls } from '../QuantityControls/QuantityControls';
import './CartItem.css';

interface CartItemProps {
	item: CartItemType;
}

export function CartItem({ item }: CartItemProps): React.ReactElement {
	const dispatch = useAppDispatch();
	const { items: cartItems } = useAppSelector((state) => state.cart);
	const { currentUser } = useAppSelector((state) => state.auth);

	const handleQuantityChange = async (newQuantity: number) => {
		dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
		if (currentUser) {
			const updatedItems = cartItems.map(cartItem => 
				cartItem.id === item.id 
					? { ...cartItem, quantity: newQuantity }
					: cartItem
			);
			dispatch(syncCartAfterChange(updatedItems));
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
			<span className="cart-item-price accent-span">${(item.price * item.quantity).toFixed(2)}</span>
			<QuantityControls
				value={item.quantity}
				onChange={handleQuantityChange}
				size="small"
				className="cart-item-quantity"
			/>
			<Button 
				className="remove-button" 
				onClick={handleRemoveItem}
			>
				×
			</Button>
		</div>
	);
} 