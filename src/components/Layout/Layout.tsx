import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';

export function Layout(): React.ReactElement {
	return (
		<div className="layout">
			<Navbar />
			<main className="main-content">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
