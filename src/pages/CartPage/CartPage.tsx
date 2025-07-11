import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { CartItem } from '../../components/CartItem/CartItem';
import { Button } from '../../components/Button/Button';
import { placeOrder } from '../../store/slices/cartSlice';
import type { RootState } from '../../store';
import './CartPage.css';

export function CartPage(): React.ReactElement {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { items, totalPrice } = useAppSelector((state: RootState) => state.cart);
	const [street, setStreet] = useState('');
	const [house, setHouse] = useState('');

	const handleOrder = () => {
		if (!street || !house) return;
		
		dispatch(placeOrder({ street, house }));
		alert(`Order placed successfully! Delivery to: ${street}, ${house}. Total: $${totalPrice.toFixed(2)}`);
		
		// Reset form in a single state update to avoid multiple re-renders
		setStreet('');
		setHouse('');
		
		// Navigate to menu or home page
		navigate('/menu');
	};

	if (items.length === 0) {
		return (
			<div className="cart-container">
				<h1 className="cart-title">Your Cart</h1>
				<div className="empty-cart">
					<h2 className="empty-cart-title">Your cart is empty</h2>
					<p className="empty-cart-message">
						Add some delicious items to your cart to get started!
					</p>
					<Link 
						to="/menu"
						className="continue-shopping-button"
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="cart-container">
			<h1 className="cart-title">Your Cart</h1>
			<div className="cart-items">
				{items.map((item) => (
					<CartItem key={item.id} item={item} />
				))}
			</div>
			
			<div className="order-form">
				<div className="form-field">
					<label 
						htmlFor="street" 
						className={street ? 'active' : ''}
					>
						Street
					</label>
					<input
						id="street"
						type="text"
						value={street}
						onChange={(e) => setStreet(e.target.value)}
						className="order-input"
					/>
				</div>
				
				<div className="form-field">
					<label 
						htmlFor="house" 
						className={house ? 'active' : ''}
					>
						House
					</label>
					<input
						id="house"
						type="text"
						value={house}
						onChange={(e) => setHouse(e.target.value)}
						className="order-input"
					/>
				</div>
				
				<Button 
					className="order-button" 
					onClick={handleOrder}
					disabled={!street || !house}
				>
					Order
				</Button>
			</div>
		</div>
	);
}
