import React, { useState } from 'react';
import './MenuPage.css';
import { Button } from '../../components/Button/Button';
import { MenuCard } from '../../components/MenuCard/MenuCard';
import { MenuSelector } from '../../components/MenuSelector/MenuSelector';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addToCart, syncCartAfterChange } from '../../store/slices/cartSlice';
import { MenuItem } from '../../types';

export function MenuPage(): React.ReactElement {
	const { menuData, categories } = useAppSelector((state) => state.menu);
	const { items: cartItems } = useAppSelector((state) => state.cart);
	const { currentUser } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const numberOfVisibleMeals = 6;
	const [selectedMenu, setSelectedMenu] = useState<string>('');
	const [visibleCount, setVisibleCount] =
		useState<number>(numberOfVisibleMeals);

	const filteredCards = selectedMenu
		? menuData.filter((card) => card.category === selectedMenu)
		: menuData;

	const visibleCards = filteredCards.slice(0, visibleCount);

	const handleMenuChange = (id: string): void => {
		setSelectedMenu(id);
		setVisibleCount(numberOfVisibleMeals);
	};

	const handleSeeMore = (): void => {
		setVisibleCount((prevCount) => prevCount + numberOfVisibleMeals);
	};

	const handleAddToCart = async (item: MenuItem, quantity: number): Promise<void> => {
		// Add items to cart
		for (let i = 0; i < quantity; i++) {
			dispatch(addToCart(item));
		}
		
		// Sync with Firestore if user is logged in
		if (currentUser) {
			// Calculate the new cart state after adding items
			const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
			let newCartItems = [...cartItems];
			
			if (existingItem) {
				newCartItems = newCartItems.map(cartItem => 
					cartItem.id === item.id 
						? { ...cartItem, quantity: Math.min(cartItem.quantity + quantity, 99) }
						: cartItem
				);
			} else {
				newCartItems.push({ ...item, quantity });
			}
			
			dispatch(syncCartAfterChange(newCartItems));
		}
	};

	return (
		<div className="menu-page">
			<div className="triangle"></div>
			<div className="title">
				<h1>Browse our menu</h1>
				<p>
					Use our menu to place an order online, or{' '}
					<span className="tooltip-container">
						phone
						<span className="tooltip-text">+370 (694) 67 353</span>
					</span>{' '}
					our store to place a pickup order. Fast and fresh food.
				</p>

				<MenuSelector
					categories={categories}
					selectedMenu={selectedMenu}
					onMenuChange={handleMenuChange}
				/>
			</div>

			<div className="menu-page-content">
				{visibleCards.length > 0 ? (
					visibleCards.map((card, index) => (
						<MenuCard
							key={index}
							image={card.image}
							title={card.title}
							price={card.price}
							description={card.description}
							onAddToCart={(quantity) => handleAddToCart(card, quantity)}
						/>
					))
				) : (
					<p>No items found in this category.</p>
				)}
			</div>

			{visibleCount < filteredCards.length && (
				<Button onClick={handleSeeMore}>See more</Button>
			)}
		</div>
	);
}
