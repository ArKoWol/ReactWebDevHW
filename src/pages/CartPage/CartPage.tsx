import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { CartItem } from '../../components/CartItem/CartItem';
import { Button } from '../../components/Button/Button';
import { DecorativeBackground } from '../../components/DecorativeBackground';
import { stablePositions, createDecorativeElement } from '../../utils/decorativePositions';
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

	const handleOrder = async () => {
		if (!street || !house) return;
		
		dispatch(clearCart());
		
		if (currentUser) {
			await dispatch(syncCartWithFirestore({ userId: currentUser.uid, cartItems: [] }));
		}
		
		alert(`Order placed successfully! Delivery to: ${street}, ${house}. Total: $${totalAmount.toFixed(2)}`);
		
		setStreet('');
		setHouse('');
		
		navigate('/menu');
	};

	if (items.length === 0) {
		return (
			<div className="cart-page">
				<DecorativeBackground density="light" variant="elegant" />
				
				{stablePositions.cart.empty.map((element, index) => 
					createDecorativeElement(element, `cart-empty-${index}`)
				)}
				
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
			</div>
		);
	}

	return (
		<div className="cart-page">
			<DecorativeBackground density="medium" variant="default" />
			
			{stablePositions.cart.filled.map((element, index) => 
				createDecorativeElement(element, `cart-filled-${index}`)
			)}
			
			<div className="cart-container">
				<h1 className="cart-title">Your Cart</h1>
				<div className="cart-items">
					{items.map((item) => (
						<CartItem key={item.id} item={item} />
					))}
				</div>
				
				<div className="total-price-container">
					<div className="total-price-card">
						<span className="total-price-label">Total:</span>
						<span className="total-price-amount">${totalAmount.toFixed(2)}</span>
					</div>
				</div>
				
				<div className="order-form">
					<div className="form-field">
						<input
							id="street"
							type="text"
							value={street}
							onChange={(e) => setStreet(e.target.value)}
							className="order-input"
						/>
						<label htmlFor="street" className={street ? 'has-value' : ''}>
							Street
						</label>
					</div>
					
					<div className="form-field">
						<input
							id="house"
							type="text"
							value={house}
							onChange={(e) => setHouse(e.target.value)}
							className="order-input"
						/>
						<label htmlFor="house" className={house ? 'has-value' : ''}>
							House
						</label>
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
		</div>
	);
}
