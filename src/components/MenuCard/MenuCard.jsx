import './MenuCard.css';
import { Button } from '../Button/Button.jsx';
import React, { Component } from 'react';

export class MenuCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
		};
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
		this.handleAddToCart = this.handleAddToCart.bind(this);
	}
	handleQuantityChange(event) {
		const value = parseInt(event.target.value);
		if (!isNaN(value) && value > 0) {
			this.setState({
				quantity: value,
			});
		}
	}
	handleAddToCart() {
		if (this.props.onAddToCart) {
			this.props.onAddToCart(this.state.quantity);
		}
	}

	render() {
		const { image, title, price, description } = this.props;

		return (
			<div className="menuCard">
				<div className="menu-img">
					<img src={image} alt="" />
				</div>
				<div className="menu-content">
					<div className="card-name-and-price">
						<h1 className="menu-card-title">{title}</h1>
						<h1 className="menu-card-prise">$ {price} USD</h1>
					</div>
					<div className="card-info">
						<p>{description}</p>
					</div>
					<div className="menu-add-buttons">
						<input
							type="text"
							value={this.state.quantity}
							onChange={this.handleQuantityChange}
							className="menu-text-input"
						/>
						<Button onClick={this.handleAddToCart}>Add to Cart</Button>
					</div>
				</div>
			</div>
		);
	}
}