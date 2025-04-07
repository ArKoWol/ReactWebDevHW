import { options } from '../../data/options.js';
import '../Navbar/NavBar.css';
import logo from '../../assets/logo.svg';
import { Button } from '../Button/Button.jsx';
import cart from '../../assets/cart.svg';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
	const navigate = useNavigate();

	const handleChange = (id) => {
		navigate(`/${id}`);
	};

	return (
		<div className="navbar">
			<div className="logo">
				<Link to="/">
					<img src={logo} alt="Logo" />
				</Link>
			</div>

			<div className="navigation">
				{options.map((item, index) => (
					<div key={index} className="radio-item">
						<input
							type="radio"
							id={item.id}
							name="pages-radio-group"
							onChange={() => handleChange(item.id)}
						/>
						<label htmlFor={item.id}>{item.label}</label>
					</div>
				))}

				<Link to="/cart">
					<Button>
						<img src={cart} alt="Cart" />
					</Button>
				</Link>
			</div>
		</div>
	);
}
