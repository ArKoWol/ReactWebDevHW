import './MenuPage.css';
import { Button } from '../../components/Button/Button.jsx';
import { menuTypes } from '../../data/menuTypes.js';
import React, { Component } from 'react';
import { cardsData } from '../../data/cardsData.js';
import { MenuCard } from '../../components/MenuCard/MenuCard.jsx';

export class MenuPage extends Component {
	render() {
		const { onAddToCart } = this.props;


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
									checked
									onChange={() => handleChange(item.id)}
								/>
								<label htmlFor={item.id}>{item.label}</label>
							</div>
						))}
					</div>
				</div>
				<div className="menu-content">
					{cardsData.slice(0, 6).map((card, index) => (
						<MenuCard
							key={index}
							image={card.image}
							title={card.title}
							price={card.price}
							description={card.description}
							onAddToCart={onAddToCart}
						/>
					))}
				</div>
				<Button>See more</Button>
			</div>
		);
	}
}