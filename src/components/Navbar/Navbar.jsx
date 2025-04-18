import { options } from '../../data/options.js';
import '../Navbar/NavBar.css';
import logo from '../../assets/logo.svg';
import cart from '../../assets/cart.svg';

import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

export class Navbar extends Component {
	render() {
		const { cartItemCount = 0 } = this.props;

		return (
			<div className="navbar">
				<div className="logo">
					<Link to="/">
						<img src={logo} alt="Logo" />
					</Link>
				</div>

				<div className="navigation">
					{options.map((item, index) => (
						<NavLink
							key={index}
							to={`/${item.id}`}
							className={({ isActive }) =>
								`radio-item-navbar ${isActive ? 'active' : ''}`
							}
						>
							{item.label}
						</NavLink>
					))}

					<NavLink
						to="/cart"
						className={({ isActive }) =>
							`cart-button ${isActive ? 'active' : ''}`
						}
					>
						<img src={cart} alt="Cart" />
						<div className="number-of-selected-products">{cartItemCount}</div>
					</NavLink>
				</div>
			</div>
		);
	}
}
