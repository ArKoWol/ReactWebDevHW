import React from 'react';
import { options } from '../../data/options';
import '../Navbar/NavBar.css';
import logo from '../../assets/logo.svg';
import cart from '../../assets/cart.svg';
import { NavLink, Link } from 'react-router-dom';

export function Navbar(): React.ReactElement {
	const cartItemCount = 0; // Статичное значение, так как cart больше не используется
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
					<div className="number-of-selected-products">
						{cartItemCount}
					</div>
				</NavLink>
			</div>
		</div>
	);
}
