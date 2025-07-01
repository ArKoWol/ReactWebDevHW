import React, { useState } from 'react';
import { options } from '../../data/options';
import '../Navbar/NavBar.css';
import { Logo } from '../Logo';
import cart from '../../assets/cart.svg';
import { NavLink, Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../context/ThemeContext';

export function Navbar(): React.ReactElement {
	const { totalQuantity } = useAppSelector((state: RootState) => state.cart);
	const { theme, toggleTheme } = useTheme();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const logoColor = theme === Theme.LIGHT ? '#35b8be' : '#7aa2f7';

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};
	
	return (
		<div className="navbar">
			<div className="logo">
				<Link to="/" onClick={closeMenu}>
					<Logo color={logoColor} width={42} height={52} />
				</Link>
			</div>

			<button className="burger-menu" onClick={toggleMenu}>
				<span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
				<span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
				<span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
			</button>

			<div className="navigation desktop-nav">
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
						{totalQuantity > 99 ? '99+' : totalQuantity}
					</div>
				</NavLink>
				<button onClick={toggleTheme} className="theme-switcher">
					{theme === Theme.LIGHT ? '🌙' : '☀️'}
				</button>
			</div>

			<div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
				<div className="mobile-menu-content">
					{options.map((item, index) => (
						<NavLink
							key={index}
							to={`/${item.id}`}
							className={({ isActive }) =>
								`mobile-nav-item ${isActive ? 'active' : ''}`
							}
							onClick={closeMenu}
						>
							{item.label}
						</NavLink>
					))}
					
					<div className="mobile-menu-actions">
						<NavLink
							to="/cart"
							className={({ isActive }) =>
								`mobile-cart-button ${isActive ? 'active' : ''}`
							}
							onClick={closeMenu}
						>
							<img src={cart} alt="Cart" />
							<span>Cart</span>
							<div className="number-of-selected-products">
								{totalQuantity > 99 ? '99+' : totalQuantity}
							</div>
						</NavLink>
						<button onClick={toggleTheme} className="mobile-theme-switcher">
							{theme === Theme.LIGHT ? '🌙 Dark' : '☀️ Light'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
