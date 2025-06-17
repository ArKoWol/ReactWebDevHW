import React, { useState } from 'react';
import './MenuPage.css';
import { Button } from '../../components/Button/Button';
import { MenuCard } from '../../components/MenuCard/MenuCard';
import { MenuSelector } from '../../components/MenuSelector/MenuSelector';
import { useAppSelector } from '../../store/hooks';

export function MenuPage(): React.ReactElement {
	const { menuData, categories } = useAppSelector((state) => state.menu);
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
