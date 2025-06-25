import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { CartItem } from '../../components/CartItem/CartItem';
import { Button } from '../../components/Button/Button';
import { clearCart, syncCartWithFirestore } from '../../store/slices/cartSlice';
import type { RootState } from '../../store';
import './CartPage.css';

export function CartPage(): React.ReactElement {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { items, totalAmount } = useAppSelector((state: RootState) => state.cart);
	const { currentUser } = useAppSelector((state: RootState) => state.auth);
	const [street, setStreet] = useState('');
	const [house, setHouse] = useState('');
	const [streetFocused, setStreetFocused] = useState(false);
	const [houseFocused, setHouseFocused] = useState(false);

	const handleOrder = async () => {
		if (!street || !house) return;
		
		// Clear the cart
		dispatch(clearCart());
		
		// Sync empty cart with Firestore after order is placed
		if (currentUser) {
			await dispatch(syncCartWithFirestore({ userId: currentUser.uid, cartItems: [] }));
		}
		
		alert(`Order placed successfully! Delivery to: ${street}, ${house}. Total: $${totalAmount.toFixed(2)}`);
		
		// Reset form
		setStreet('');
		setHouse('');
		setStreetFocused(false);
		setHouseFocused(false);
		
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
					<Button 
						className="continue-shopping-button" 
						onClick={() => navigate('/menu')}
					>
						Continue Shopping
					</Button>
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
						className={streetFocused || street ? 'active' : ''}
					>
						Street
					</label>
					<input
						id="street"
						type="text"
						value={street}
						onChange={(e) => setStreet(e.target.value)}
						onFocus={() => setStreetFocused(true)}
						onBlur={() => setStreetFocused(false)}
						className="order-input"
					/>
				</div>
				
				<div className="form-field">
					<label 
						htmlFor="house" 
						className={houseFocused || house ? 'active' : ''}
					>
						House
					</label>
					<input
						id="house"
						type="text"
						value={house}
						onChange={(e) => setHouse(e.target.value)}
						onFocus={() => setHouseFocused(true)}
						onBlur={() => setHouseFocused(false)}
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
