import './MenuPage.css';
import { Button } from '../../components/Button/Button.jsx';
import { menuTypes } from '../../data/menuTypes.js';
import React, { useState, useEffect } from 'react';
import { MenuCard } from '../../components/MenuCard/MenuCard.jsx';

export function MenuPage({ onAddToCart }) {
	const [cardsData, setCardsData] = useState([]);
	const [selectedMenu, setSelectedMenu] = useState('dessert');
	const [visibleCount, setVisibleCount] = useState(6);

	useEffect(() => {
		fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals')
			.then((res) => res.json())
			.then((data) => {
				const formatted = data.map((item) => ({
					id: item.id,
					image: item.img,
					title: item.meal,
					price: item.price,
					description: item.instructions,
					category: item.category.toLowerCase(),
				}));
				setCardsData(formatted);
			})
			.catch((error) => {
				console.error('Error fetching menu data:', error);
			});
	}, []);

	const handleSeeMore = () => {
		setVisibleCount((prevCount) => prevCount + 6);
	};

	const handleMenuChange = (menuId) => {
		setSelectedMenu(menuId);
		setVisibleCount(6);
	};

	const filteredCards = selectedMenu
		? cardsData.filter(
				(card) => card.category.toLowerCase() === selectedMenu.toLowerCase(),
			)
		: cardsData;

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
				<div className="menu-select">
					{menuTypes.map((item, index) => (
						<div key={index} className="radio-item-menu">
							<input
								type="radio"
								id={item.id}
								name="menus-radio-group"
								checked={selectedMenu === item.id}
								onChange={() => handleMenuChange(item.id)}
							/>
							<label htmlFor={item.id}>{item.label}</label>
						</div>
					))}
				</div>
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
