import { options } from '../../data/options.js';
import '../Navbar/NavBar.css';
import logo from '../../assets/logo.svg';
import { Button } from '../Button/Button.jsx';
import cart from '../../assets/cart.svg';

import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export function Navbar() {
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
					className={({ isActive }) => `${isActive ? 'active' : ''}`}
				>
					<Button>
						<img src={cart} alt="Cart" />
						<div className="number-of-selected-products">0</div>
					</Button>
				</NavLink>
			</div>
		</div>
	);
}
