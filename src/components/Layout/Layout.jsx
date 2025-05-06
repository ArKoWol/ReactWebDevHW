import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar.jsx';
import { Footer } from '../Footer/Footer.jsx';

export function Layout({ cartItemCount }) {
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
