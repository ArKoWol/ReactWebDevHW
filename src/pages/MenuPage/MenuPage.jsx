import './MenuPage.css';
import { Button } from '../../components/Button/Button.jsx';
import { menuTypes } from '../../data/menuTypes.js';
import React, { Component } from 'react';
import { MenuCard } from '../../components/MenuCard/MenuCard.jsx';

export class MenuPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardsData: [],
			selectedMenu: '',
			visibleCount: 6,
		};
	}

	componentDidMount() {
		fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				const formatted = data.map((item) => ({
					id: item.id,
					image: item.img,
					title: item.meal,
					price: item.price,
					description: item.instructions,
				}));
				this.setState({ cardsData: formatted });
			});
	}

	handleSeeMore = () => {
		this.setState((prevState) => ({
			visibleCount: prevState.visibleCount + 6,
		}));
	};

	render() {
		const { onAddToCart } = this.props;
		const { cardsData, selectedMenu, visibleCount } = this.state;

		const filteredCards = selectedMenu
			? cardsData.filter((card) => card.category === selectedMenu)
			: cardsData;

		const visibleCards = filteredCards.slice(0, visibleCount);


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
								/>
								<label htmlFor={item.id}>{item.label}</label>
							</div>
						))}
					</div>
				</div>

				<div className="menu-page-content">
					{visibleCards.map((card, index) => (
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
				<Button onClick={this.handleSeeMore}>See more</Button>
			</div>
		);
	}
}
