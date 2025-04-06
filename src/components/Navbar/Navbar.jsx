import { options } from '../../data/options.js';
import '../Navbar/NavBar.css';
import logo from '../../assets/logo.svg';
import { Button } from '../Button/Button.jsx';
import cart from '../../assets/cart.svg';

import React from 'react';

export function Navbar() {
	return (
		<div className="navbar">
			<div className='logo'>
				<img src={logo} alt="Logo" />
			</div>
			<div className='navigation'>
				{options.map((item, index) => (
					<div key={index} className="radio-item">
						<input
							type="radio"
							id={item.id}
							name="radio-group"
						/>
						<label htmlFor={item.id}>{item.label}</label>
					</div>
				))}
				<Button>
					<img src={cart} alt=""/>
				</Button>
			</div>
		</div>
	);
}
