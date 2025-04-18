import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar.jsx';
import { Footer } from '../Footer/Footer.jsx';

export class Layout extends Component {
	render() {
		const { cartItemCount } = this.props;

		return (
			<div className="layout">
				<Navbar cartItemCount={cartItemCount} />

				<main className="main-content">
					<Outlet />
				</main>
				<Footer />
			</div>
		);
	}
}
