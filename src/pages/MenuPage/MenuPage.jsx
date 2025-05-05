import './MenuPage.css';
import { Button } from '../../components/Button/Button.jsx';
import React, { useState, useEffect } from 'react';
import { MenuCard } from '../../components/MenuCard/MenuCard.jsx';
import { MenuSelector } from '../../components/MenuSelector/MenuSelector.jsx';

export function MenuPage({ onAddToCart, menuData, categories }) {
	const numberOfVisibleMeals = 6;

	const [selectedMenu, setSelectedMenu] = useState('');
	const [visibleCount, setVisibleCount] = useState(numberOfVisibleMeals);

	useEffect(() => {
		if (categories.length > 0) {
			setSelectedMenu(categories[0].id);
		}
	}, [categories]);

	const handleSeeMore = () => {
		setVisibleCount((prevCount) => prevCount + numberOfVisibleMeals);
	};

	const handleMenuChange = (menuId) => {
		setSelectedMenu(menuId);
		setVisibleCount(numberOfVisibleMeals);
	};

	const filteredCards = selectedMenu
		? menuData.filter(
				(card) => card.category.toLowerCase() === selectedMenu.toLowerCase(),
			)
		: menuData;

	const visibleCards = filteredCards.slice(0, visibleCount);

	const handleAddToCart = (quantity) => {
		if (onAddToCart) {
			onAddToCart(quantity);
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
							onAddToCart={handleAddToCart}
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
